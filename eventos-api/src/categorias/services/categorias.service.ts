import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Categoria } from '../models/categorias.dto';
import { CategoriasEntity } from '../models/categorias.entity';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(CategoriasEntity)
        private readonly categoriasRepository: Repository<CategoriasEntity>
    ){}

    async createCategoria(categoria: Categoria): Promise<Categoria> {
        return await this.categoriasRepository.save(categoria);
    }

    async getAllCategorias(): Promise<Categoria[]>{
        return await this.categoriasRepository.find();
    }

    async getCategoriaByID(id: number): Promise<Categoria>{
        return await this.categoriasRepository.findOneOrFail(id);
    }
    
    async updateCategoria(id: number, categoria: Categoria): Promise<UpdateResult> {
        return await this.categoriasRepository.update(id, categoria);
    }

    async deleteCategoria(id: number): Promise<DeleteResult> {
        return await this.categoriasRepository.delete(id);
    }
}
