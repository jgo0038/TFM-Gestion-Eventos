import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EventosEntity } from 'src/eventos/models/eventos.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Ciudad } from '../models/ciudades.dto';
import { CiudadesEntity } from '../models/ciudades.entity';
import { CiudadesService } from '../services/ciudades.service';

@Controller('ciudades')
export class CiudadesController {

    constructor(private ciudadesService: CiudadesService) {

    }

    @Post()
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    create(@Body() ciudad: Ciudad): Observable<Ciudad>{
        return from(this.ciudadesService.createCiudad(ciudad))
    }

    @Get()
    getAll(): Observable<CiudadesEntity[]>{
        return from(this.ciudadesService.getAllCiudades());
    }

    @Get('eventos')
    getAllCiudadesEventos(): Observable<CiudadesEntity[]>{
        return from(this.ciudadesService.getAllCiudadesWithEventos());
    }

    @Get(':ciudadID')
    getByID(@Param() id: number): Observable<Ciudad>{
        return from(this.ciudadesService.getCiudadByID(id));
    }

    // @Get('evento/:ciudadID')
    // getEventosByCiudad(@Param('ciudadID') id: number): Observable<EventosEntity[]>{
    //     return this.ciudadesService.getEventosByCiudad(id);
    // }

    @Put(':ciudadID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    edit(@Param() id: number, @Body() ciudad: Ciudad): Observable<UpdateResult>{
        return from(this.ciudadesService.updateCiudad(id, ciudad));
    }

    @Delete(':ciudadID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    delete(@Param() id: number): Observable<DeleteResult>{
        return from(this.ciudadesService.deleteCiudad(id));
    }
}
