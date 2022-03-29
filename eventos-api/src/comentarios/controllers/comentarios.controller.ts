import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { Comentario } from '../models/comentarios.dto';
import { ComentariosService } from '../services/comentarios.service';

@Controller('comentarios')
export class ComentariosController {

    constructor(private comentariosService: ComentariosService) {}
    
    @Get(':eventoID')
    getComentariosByEvento(@Param('eventoID') eventoID: string): Observable<Comentario[]>{
        return from(this.comentariosService.getComentariosByEvento(eventoID));
    }
    
    @Post()
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    create(@Body() comentario: Comentario): Observable<Comentario>{
        return from(this.comentariosService.createComentario(comentario));
    }
    
    @Delete(':comentarioID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    delete(@Param() comentarioID: number): Observable<DeleteResult>{
        return from(this.comentariosService.deleteComentario(comentarioID));
    }

}
