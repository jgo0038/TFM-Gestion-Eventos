import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventosEntity } from 'src/eventos/models/eventos.entity';
import { createQueryBuilder, DeleteResult, getConnection, getRepository, Repository, UpdateResult } from 'typeorm';
import { CiudadesMapper } from '../ciudades.mapper';
import { Ciudad } from '../models/ciudades.dto';
import { CiudadesEntity } from '../models/ciudades.entity';

@Injectable()
export class CiudadesService {
    constructor(
        @InjectRepository(CiudadesEntity)
        private readonly ciudadesRepository: Repository<CiudadesEntity>,
        private readonly mapper: CiudadesMapper
    ){}

    async createCiudad(ciudad: Ciudad): Promise<Ciudad> {
        const ciudadDto: CiudadesEntity = await this.mapper.dtoToEntity(ciudad);
        return this.mapper.entityToDto(await this.ciudadesRepository.save(ciudadDto)) ;
    }

    async getAllCiudades(): Promise<CiudadesEntity[]>{
        return await this.ciudadesRepository.find();
    }

    async getAllCiudadesWithEventos(): Promise<CiudadesEntity[]>{
        return await this.ciudadesRepository.find({relations: ['eventos']});
    }

    async getCiudadByID(id: number): Promise<Ciudad>{
        return this.mapper.entityToDto(await this.ciudadesRepository.findOneOrFail(id));
    }

    // async getEventosByCiudad(id: number): Promise<EventosEntity[]>{
    //     const ciudad: CiudadesEntity = await this.ciudadesRepository.findOne({
    //         where: { ciudadID: id },
    //         relations: ['eventos'],
    //       });
    //     return ciudad.eventos;
    //     const eventos = await getRepository(CiudadesEntity).createQueryBuilder("ciudades")
    //     .leftJoinAndSelect("ciudades.eventos", "eventos")
    //     .where('ciudades.ciudadID = :ciudad', { ciudad: id })
    //     .execute();
    //     return eventos;
    // }

    async updateCiudad(id: number, ciudad: Ciudad): Promise<UpdateResult> {
        const ciudadDto: CiudadesEntity = await this.mapper.dtoToEntity(ciudad);
        return this.ciudadesRepository.update(id, ciudadDto);
    }

    async deleteCiudad(id: number): Promise<DeleteResult> {
        return await this.ciudadesRepository.delete(id);
    }
}
