
import * as bcrypt from 'bcrypt';
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventosMapper } from "src/eventos/eventos.mapper";
import { Evento } from "src/eventos/models/eventos.dto";
import { EventosEntity } from "src/eventos/models/eventos.entity";
import { createQueryBuilder, DeleteResult, getConnection, Repository, UpdateResult } from "typeorm";
import { Usuario } from "./models/usuarios.dto";
import { UsuariosEntity } from "./models/usuarios.entity";
import { UsuariosMapper } from "./usuarios.mapper";

export class UsuariosRepository {
    constructor(
      @InjectRepository(UsuariosEntity)
      private usuariosRepository: Repository<UsuariosEntity>,
      private mapper: UsuariosMapper,
    ) {}

      async borrarInscripcion(eventoID: string, usuarioID: string): Promise<DeleteResult>{
        const evento: EventosEntity = await EventosEntity.findOne(eventoID);
        const user: UsuariosEntity = await UsuariosEntity.findOneOrFail(usuarioID, { relations: ['eventosCreados', 'eventosInscritos'] });
        return await getConnection()
        .createQueryBuilder()
        .update('usuarios_eventos_inscritos_eventos')
        .delete()
        .where('eventosEventoID = :eventosEventoID', { eventosEventoID: eventoID })
        .andWhere('usuariosUsuarioID = :usuariosUsuarioID', { usuariosUsuarioID: usuarioID })
        .execute();
      }

      async inscribirse(eventoID: string, usuarioID: number): Promise<UpdateResult>{
        const evento: EventosEntity = await EventosEntity.findOne(eventoID);
        const user: UsuariosEntity = await UsuariosEntity.findOneOrFail(usuarioID, { relations: ['eventosCreados', 'eventosInscritos'] });
        if(evento.inscripcion === true){
          user.eventosInscritos.push(evento);
          Logger.log(user.eventosInscritos[0].eventoID)
          return await getConnection()
          .createQueryBuilder()
          .insert()
          .into('usuarios_eventos_inscritos_eventos')
          .values({
            usuariosUsuarioID: usuarioID,
            eventosEventoID: eventoID
          })
          .execute();
        }
      }

      async getInscripcionesByID(usuarioID: number): Promise<Usuario>{
        let inscripciones: string[] = new Array<string>();
        const user: UsuariosEntity = await UsuariosEntity.findOneOrFail(usuarioID, { relations: ['eventosCreados', 'eventosInscritos'] });
        const userDto: Usuario = this.mapper.entityToDto(user);
        inscripciones =  await getConnection()
        .createQueryBuilder()
        .select('eventosInscritos.eventosEventoID')
        .from('usuarios_eventos_inscritos_eventos', 'eventosInscritos')
        .where("eventosInscritos.usuariosUsuarioID = :usuarioID", { usuarioID: usuarioID })
        .execute();
        userDto.eventosInscritos = inscripciones;
        return userDto;
      }

      async newUsuario(usuario: Usuario): Promise<UsuariosEntity>{
        const newUsuario = await this.mapper.dtoToEntity(usuario);
        return this.usuariosRepository.save(newUsuario);
      }

      async updateusuario(usuarioID: number,usuario: Usuario): Promise<UpdateResult>{
        const salt = await bcrypt.genSalt();
        let contraseña = await bcrypt.hash(usuario.contraseña, salt);
        return await getConnection()
        .createQueryBuilder()
        .update('usuarios')
        .set({mail: usuario.mail,
          nombre: usuario.nombre,
          apellidos: usuario.apellidos,
          fecha_nac: usuario.fecha_nac,
          telefono: usuario.telefono,
          particular: usuario.particular,
          negocio: usuario.negocio,
          ubicacion: usuario.ubicacion,
          descripcion: usuario.descripcion,
          contraseña: contraseña
        })
        .where('usuarioID = :usuarioID', { usuarioID: usuarioID })
        .execute();
      }
}