import { Logger } from "@nestjs/common";
import { EventosEntity } from "src/eventos/models/eventos.entity";
import { UsuariosEntity } from "src/usuarios/models/usuarios.entity";
import { Comentario } from "./models/comentarios.dto";
import { ComentariosEntity } from "./models/comentarios.entity";


export class ComentariosMapper {
  async dtoToEntity(comentarioDto: Comentario): Promise<ComentariosEntity> {
    const creador = await UsuariosEntity.findOne(comentarioDto.creador);

    const evento = await EventosEntity.findOne(comentarioDto.evento);

    if(creador && evento){
      return new ComentariosEntity(
      comentarioDto.comentarioID,
      comentarioDto.titulo,
      comentarioDto.texto,
      comentarioDto.fecha,
      creador,
      evento      
      );
    } else {
      throw "El usuario o evento dados no existen"
    }
  }

  entityToDto(comentarioEntity: ComentariosEntity): Comentario {

    if(comentarioEntity.creador && comentarioEntity.evento){
      return new Comentario(
        comentarioEntity.comentarioID,
        comentarioEntity.titulo,
        comentarioEntity.texto,
        comentarioEntity.fecha,
        comentarioEntity.creador.usuarioID,
        comentarioEntity.evento.eventoID,
      );
    } else {
      throw "El usuario o evento no existen";
    }
    
  }
}
