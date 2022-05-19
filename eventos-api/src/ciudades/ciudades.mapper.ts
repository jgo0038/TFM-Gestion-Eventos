import { Categoria } from "src/categorias/models/categorias.dto";
import { CategoriasEntity } from "src/categorias/models/categorias.entity";
import { CiudadesEntity } from "src/ciudades/models/ciudades.entity";
import { Evento } from "src/eventos/models/eventos.dto";
import { UsuariosEntity } from "src/usuarios/models/usuarios.entity";
import { Ciudad } from "./models/ciudades.dto";


export class CiudadesMapper {
  async dtoToEntity(ciudad: Ciudad): Promise<CiudadesEntity> {
    // const usuarioAsociado = await UsuariosEntity.findOne(ciudad.creador);

    // const ciudadAsociada = await CiudadesEntity.findOne(ciudad.ciudad);

    // const categoriasAsociadas: CategoriasEntity[] = new Array<CategoriasEntity>();

    // if (ciudad.categorias) {
    //   for (let i = 0; i < ciudad.categorias.length; i++) {
    //     const category = await CategoriasEntity.findOne(ciudad.categorias[i].categoriaID);
    //     categoriasAsociadas.push(category);
    //   }
    // }

    return new CiudadesEntity(
      ciudad.ciudadID,
      ciudad.nombre,
      ciudad.descripcion,
    );
  }

  entityToDto(ciudadEntity: CiudadesEntity): Ciudad {
    const eventos: Evento[] = new Array<Evento>();
    let categorias: number[] = new Array<number>();

    if(ciudadEntity.eventos)
    {
      for (let i = 0; i < ciudadEntity.eventos.length; i++) {
        for(let i = 0; i < ciudadEntity.eventos[i].categorias.length; i++){
          categorias.push(ciudadEntity.eventos[i].categorias[i].categoriaID);
        }
        const evento = new Evento(
          ciudadEntity.eventos[i].eventoID,
          ciudadEntity.eventos[i].nombre,
          ciudadEntity.eventos[i].descripcion,
          ciudadEntity.eventos[i].ubicacion,
          ciudadEntity.eventos[i].fecha_pub,
          ciudadEntity.eventos[i].fecha_evento,
          ciudadEntity.eventos[i].precio,
          ciudadEntity.eventos[i].inscripcion,
          ciudadEntity.eventos[i].cancelado,
          ciudadEntity.eventos[i].duracion,
          ciudadEntity.eventos[i].creador.mail,
          ciudadEntity.eventos[i].ciudad.nombre,
          categorias,
        );

        eventos.push(evento);
        categorias = [];
    }}

    return new Ciudad(
      ciudadEntity.ciudadID,
      ciudadEntity.nombre,
      ciudadEntity.descripcion,
      eventos      
    );
  }
}
