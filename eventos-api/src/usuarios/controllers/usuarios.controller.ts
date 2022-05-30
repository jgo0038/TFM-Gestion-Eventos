import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Usuario } from '../models/usuarios.dto';
import { UsuariosEntity } from '../models/usuarios.entity';
import { UsuariosService } from '../services/usuarios.service';

@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}

    @Post()
    create(@Body() usuario: Usuario): Observable<Usuario>{
        return from(this.usuariosService.createUsuario(usuario));
    }

    @Get()
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    getAll(): Observable<Usuario[]>{
        return from(this.usuariosService.getAllUsuarios());
    }

    @Get(':usuarioID')
    getByID(@Param('usuarioID') id: number): Observable<UsuariosEntity>{
        return from(this.usuariosService.getUsuarioByID(id));
    }

    @Get('mail/:mail')
    getByMail(@Param('mail') mail: string): Observable<UsuariosEntity>{
        return from(this.usuariosService.getUsuarioByEmail(mail));
    }

    @Get('inscripciones/:usuarioID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    getInscripcionesByUser(@Param('usuarioID') usuarioID: number): Observable<Usuario>{
        return from(this.usuariosService.getInscripcionesByID(usuarioID));
    }

    @Put(':usuarioID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    edit(@Param('usuarioID') id: number, @Body() usuario: Usuario): Observable<UpdateResult>{
        return from(this.usuariosService.updateUsuario(id, usuario));
    }

    @Put('inscribir/:eventoID/:usuarioID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    inscribirse(@Param('eventoID') eventoID: string, @Param('usuarioID') usuarioID: number): Observable<UpdateResult>{
        return from(this.usuariosService.inscribirse(eventoID, usuarioID));
    }

    @Delete(':usuarioID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    delete(@Param('usuarioID') id: number): Observable<DeleteResult>{
        return from(this.usuariosService.deleteUsuario(id));
    }

    @Delete('borrarInscripcion/:eventoID/:usuarioID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    deleteInscripcion(@Param('eventoID') eventoID: string, @Param('usuarioID') usuarioID: string): Observable<DeleteResult>{
        return from(this.usuariosService.deleteInscripcion(eventoID, usuarioID));
    }

}
