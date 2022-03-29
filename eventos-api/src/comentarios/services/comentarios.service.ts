import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ComentariosMapper } from '../comentarios.mapper';
import { Comentario } from '../models/comentarios.dto';
import { ComentariosEntity } from '../models/comentarios.entity';

@Injectable()
export class ComentariosService {

    constructor(
        @InjectRepository(ComentariosEntity)
        private readonly comentariosRepository: Repository<ComentariosEntity>,
        private readonly mapper: ComentariosMapper
    ){}

    async createComentario(comentario: Comentario): Promise<Comentario> {
        let comentarioEnt: ComentariosEntity = await this.mapper.dtoToEntity(comentario);
        return this.mapper.entityToDto(await this.comentariosRepository.save(comentarioEnt));
    }

    async deleteComentario(comentarioID: number): Promise<DeleteResult> {
        return await this.comentariosRepository.delete(comentarioID);
    }

    async getComentariosByEvento(eventoID: string): Promise<Comentario[]> {
        const comentarios: ComentariosEntity[] = await this.comentariosRepository.find({
            where: { evento: eventoID },
            relations: ['creador', 'evento'],
          });
          Logger.log(comentarios)
        return comentarios.map((coment) => this.mapper.entityToDto(coment));
    }

}
