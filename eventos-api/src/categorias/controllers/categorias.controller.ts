import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Categoria } from '../models/categorias.dto';
import { CategoriasService } from '../services/categorias.service';

@Controller('categorias')
export class CategoriasController {

    constructor(private categoriasService: CategoriasService) {
    }

    @Post()
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    create(@Body() categoria: Categoria): Observable<Categoria>{
        return from(this.categoriasService.createCategoria(categoria));
    }

    @Get()
    getAll(): Observable<Categoria[]>{
        return from(this.categoriasService.getAllCategorias());
    }

    @Get(':categoriaID')
    getByID(@Param() id: number): Observable<Categoria>{
        return from(this.categoriasService.getCategoriaByID(id));
    }

    @Put(':categoriaID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    edit(@Param() id: number, @Body() ciudad: Categoria): Observable<UpdateResult>{
        return from(this.categoriasService.updateCategoria(id, ciudad));
    }

    @Delete(':categoriaID')
    @ApiBearerAuth('access_token')
    @UseGuards(JwtAuthGuard)
    delete(@Param() id: number): Observable<DeleteResult>{
        return from(this.categoriasService.deleteCategoria(id));
    }
}
