import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Usuario } from '../models/usuarios.dto';
import { UsuariosEntity } from '../models/usuarios.entity';
import { UsuariosMapper } from '../usuarios.mapper';
import { UsuariosRepository } from '../usuarios.repository';

@Injectable()
export class UsuariosService {
    constructor(@InjectRepository(UsuariosEntity)
    private readonly usuariosDefaultRepository: Repository<UsuariosEntity>,
    private readonly usuariosRepository: UsuariosRepository,
    private readonly mapper: UsuariosMapper
    ){}

    async createUsuario(usuario: Usuario): Promise<Usuario> {
        const user: UsuariosEntity = await this.usuariosRepository.newUsuario(usuario)
        return this.mapper.entityToDto(await this.usuariosDefaultRepository.save(user));
    }

    async inscribirse(eventoID: string, usuarioID: number): Promise<UpdateResult> {
        return await this.usuariosRepository.inscribirse(eventoID, usuarioID);
    }

    async getAllUsuarios(): Promise<Usuario[]> {
        const usuarios: UsuariosEntity[] = await this.usuariosDefaultRepository.find({
            relations: ['eventosCreados', 'eventosInscritos']
        });
        return usuarios.map((usuario) => this.mapper.entityToDto(usuario));
    }

    async getInscripcionesByID(id: number): Promise<Usuario>{
        return await this.usuariosRepository.getInscripcionesByID(id)
    }

    async getUsuarioByID(id: number): Promise<Usuario>{
        return this.mapper.entityToDto(await this.usuariosDefaultRepository.findOneOrFail(
            id,
            { relations: ['eventosCreados', 'eventosInscritos'] }));
    }
    
    async getUsuarioByEmail(mail: string): Promise<UsuariosEntity>{
        const usuario = await this.usuariosDefaultRepository.findOne({
            where: { mail: mail},
            relations: ['eventosCreados', 'eventosInscritos'],
          })
        return usuario;
    }
    
    async updateUsuario(usuarioID: number, usuario: Usuario): Promise<UpdateResult> {
        return await this.usuariosRepository.updateusuario(usuarioID, usuario)
    }

    async deleteInscripcion(eventoID: string, usuarioID: string): Promise<DeleteResult> {
        return await this.usuariosRepository.borrarInscripcion(eventoID, usuarioID);
    }

    async deleteUsuario(id: number): Promise<DeleteResult> {
        return await this.usuariosDefaultRepository.delete(id);
    }
}
