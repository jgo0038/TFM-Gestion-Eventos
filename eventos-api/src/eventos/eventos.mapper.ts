import { Logger } from "@nestjs/common";
import { Categoria } from "src/categorias/models/categorias.dto";
import { CategoriasEntity } from "src/categorias/models/categorias.entity";
import { CiudadesEntity } from "src/ciudades/models/ciudades.entity";
import { UsuariosEntity } from "src/usuarios/models/usuarios.entity";
import { Evento } from "./models/eventos.dto";
import { EventosEntity } from "./models/eventos.entity";


export class EventosMapper {
  async dtoToEntity(eventosDto: Evento): Promise<EventosEntity> {
    const usuarioAsociado = await UsuariosEntity.findOne(eventosDto.creador);

    const ciudadAsociada = await CiudadesEntity.findOne(eventosDto.ciudad);

    const categoriasAsociadas: CategoriasEntity[] = new Array<CategoriasEntity>();

    let fotoPortada = ''
    let fotosEvento = []

    if (eventosDto.categorias) {
      for (let i = 0; i < eventosDto.categorias.length; i++) {
        const category = await CategoriasEntity.findOne(eventosDto.categorias[i]);
        categoriasAsociadas.push(category);
      }
    }

    if(eventosDto.fotoPortada){
      fotoPortada = eventosDto.fotoPortada
    }

    if(eventosDto.fotosEvento){
      fotosEvento = eventosDto.fotosEvento
    }
      

    return new EventosEntity(
      eventosDto.eventoID,
      eventosDto.nombre,
      eventosDto.descripcion,
      eventosDto.ubicacion,
      eventosDto.fecha_pub,
      eventosDto.fecha_evento,
      eventosDto.precio,
      eventosDto.inscripcion,
      eventosDto.cancelado,
      eventosDto.duracion,
      usuarioAsociado,
      ciudadAsociada,
      categoriasAsociadas,
      fotoPortada,
      fotosEvento,
    );
  }

  entityToDto(eventosEntity: EventosEntity): Evento {
    const categorias: number[] = new Array<number>();
    
    let fotoPortada = ''
    let fotosEvento = []

    for (let i = 0; i < eventosEntity.categorias.length; i++) {
      // const categoria = new Categoria(
      //   eventosEntity.categorias[i].categoriaID,
      //   eventosEntity.categorias[i].nombre,
      //   eventosEntity.categorias[i].descripcion
      // );

      // categorias.push(categoria);
      categorias.push(eventosEntity.categorias[i].categoriaID)
    }

    if(eventosEntity.fotoPortada){
      fotoPortada = eventosEntity.fotoPortada
    }

    if(eventosEntity.fotosEvento){
      fotosEvento = eventosEntity.fotosEvento
    }

    return new Evento(
      eventosEntity.eventoID,
      eventosEntity.nombre,
      eventosEntity.descripcion,
      eventosEntity.ubicacion,
      eventosEntity.fecha_pub,
      eventosEntity.fecha_evento,
      eventosEntity.precio,
      eventosEntity.inscripcion,
      eventosEntity.cancelado,
      eventosEntity.duracion,
      eventosEntity.creador.mail,
      eventosEntity.ciudad.nombre,
      categorias,
      fotoPortada,
      fotosEvento,
    );
  }
}
