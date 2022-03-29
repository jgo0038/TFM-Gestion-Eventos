import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Evento } from '../models/eventos.dto';
import { EventosEntity } from '../models/eventos.entity';
import { EventosService } from '../services/eventos.service';

@Controller('eventos')
export class EventosController {
    
    constructor(private eventosService: EventosService) {

    }

    @Get()
    getAllEventos(): Observable<Evento[]> {
        return from(this.eventosService.getAllEventos());
    }

    @Get(':eventoID')
    getEventoById(@Param('eventoID') eventoID: string): Observable<Evento> {
        return from(this.eventosService.getEventoById(eventoID));
    }

    @Get('eventoCiudad/:ciudadID')
    getEventosByCiudad(@Param('ciudadID') ciudadID: number): Observable<Evento[]>{
        return from(this.eventosService.getEventosByCiudad(ciudadID));
    }

    @Get('eventoCategoria/:categoriaID')
    getEventosByCategoria(@Param('categoriaID') categoriaID: number): Observable<Evento[]>{
        return from(this.eventosService.getEventosByCategoria(categoriaID));
    }

    @Get('eventoInscripciones/:eventoID')
    getInscripcionesByEventoID(@Param('eventoID') eventoID: string): Observable<number[]>{
        return from(this.eventosService.getInscripcionesByID(eventoID));
    }

    @Post()
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    newEvento(@Body() evento: Evento): Observable<Evento> {
        return from(this.eventosService.createEvento(evento));
    }

    @Put(':eventoID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    updateEvento(@Param('eventoID') eventoID: string,@Body() evento: Evento): Observable<EventosEntity> {
        return from(this.eventosService.updateEvento(eventoID, evento));
    }

    @Delete(':eventoID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    deleteEvento(@Param() eventoID: string): Observable<DeleteResult> {
        return from(this.eventosService.deleteEvento(eventoID));
    }
}
