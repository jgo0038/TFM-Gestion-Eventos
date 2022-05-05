import { Categoria } from "src/categorias/models/categorias.dto";
import { CategoriasEntity } from "src/categorias/models/categorias.entity";
import { CiudadesEntity } from "src/ciudades/models/ciudades.entity";
import { Evento } from "src/eventos/models/eventos.dto";
import { EventosEntity } from "src/eventos/models/eventos.entity";
import { UsuariosEntity } from "src/usuarios/models/usuarios.entity";
import { Usuario } from "./models/usuarios.dto";


export class UsuariosMapper {
  async dtoToEntity(usuario: Usuario): Promise<UsuariosEntity> {

    const eventosCreados: EventosEntity[] = new Array<EventosEntity>();

    const eventosInscritos: EventosEntity[] = new Array<EventosEntity>();

    if (usuario.eventosCreados) {
      for (let i = 0; i < usuario.eventosCreados.length; i++) {
        const eventoCr = await EventosEntity.findOne(usuario.eventosCreados[i]);
        eventosCreados.push(eventoCr);
      }
    }

    if (usuario.eventosInscritos) {
      for (let i = 0; i < usuario.eventosInscritos.length; i++) {
        const eventoIns = await EventosEntity.findOne(usuario.eventosInscritos[i]);
        eventosInscritos.push(eventoIns);
      }
    }

    if(!usuario.foto)
      usuario.foto = ''

    return new UsuariosEntity(
      usuario.usuarioID,
      usuario.mail,
      usuario.nombre,
      usuario.apellidos,
      usuario.fecha_nac,
      usuario.telefono,
      usuario.particular,
      usuario.negocio,
      usuario.descripcion,
      usuario.ubicacion,
      usuario.contraseña,
      usuario.genero,
      usuario.foto,
      eventosCreados,
      eventosInscritos     
    );
  }

  entityToDto(usuariosEntity: UsuariosEntity): Usuario {

    const eventosCreados: string[] = new Array<string>();
    const eventosInscritos: string[] = new Array<string>();

    for(let i = 0; i<usuariosEntity.eventosCreados.length; i++){
        eventosCreados.push(usuariosEntity.eventosCreados[i].eventoID);
    }

    for(let i = 0; i<usuariosEntity.eventosInscritos.length; i++){
        eventosCreados.push(usuariosEntity.eventosInscritos[i].eventoID);
    }

    if(!usuariosEntity.foto)
      usuariosEntity.foto = ''

    return new Usuario(
      usuariosEntity.usuarioID,
      usuariosEntity.mail,
      usuariosEntity.nombre,
      usuariosEntity.apellidos,
      usuariosEntity.fecha_nac,
      usuariosEntity.telefono,
      usuariosEntity.particular,
      usuariosEntity.negocio,
      usuariosEntity.descripcion,
      usuariosEntity.ubicacion,
      usuariosEntity.contraseña,
      usuariosEntity.genero,
      usuariosEntity.foto,
      eventosCreados,
      eventosInscritos
    );
  }
}
