import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createQueryBuilder, DeleteResult, getConnection, getRepository, Repository, UpdateResult } from "typeorm";
import { EventosMapper } from "./eventos.mapper";
import { Evento } from "./models/eventos.dto";
import { EventosEntity } from "./models/eventos.entity";
import { EventosCategoriaEntity } from "./models/eventosCategoria.entity";

export class EventosRepository {
    constructor(
      @InjectRepository(EventosEntity)
      private eventosRepository: Repository<EventosEntity>,
      private mapper: EventosMapper,
    ) {}

    async getAllEventos(): Promise<EventosEntity[]> {
        return this.eventosRepository.find({ relations: ['creador', 'categorias', 'ciudad'] });
    }

    async getEventosByCategoria(categoriaID: number): Promise<EventosEntity[]> {
        let eventosIDs: EventosCategoriaEntity[] = await getConnection()
        .createQueryBuilder()
        .from('eventos_categorias_categorias', 'eventosCategorias')
        .where('eventosCategorias.categoriasCategoriaID = :categoriasCategoriaID', { categoriasCategoriaID: categoriaID })
        .execute();
        if(eventosIDs.length > 0){
            let eventos: EventosEntity[] = new Array<EventosEntity>();
            if(eventosIDs[0].eventosEventoID){
                for(let i = 0; i< eventosIDs.length; i++){
                    let id = eventosIDs[i].eventosEventoID;
                    eventos.push(await this.eventosRepository.findOne(id, { relations: ['creador', 'categorias', 'ciudad'] }))
                }
            }
            return eventos;
        } else {
            return null
        }
        
        
    }

    async getEventosByCiudad(ciudadID: number): Promise<EventosEntity[]> {
        const eventos: EventosEntity[] = await this.eventosRepository.find({
            where: { ciudad: ciudadID },
            relations: ['creador', 'categorias', 'ciudad'],
          });
        return eventos;
    }
    
    async getEventosByCiudadCategoria(ciudadID: number, categoriaID: number): Promise<EventosEntity[]> {
        let eventos: EventosEntity[] = await getConnection()
        .createQueryBuilder()
        .from('eventos_categorias_categorias', 'eventosCategorias')
        .leftJoin('eventos','eventos')
        .where('eventosCategorias.categoriasCategoriaID = :categoriasCategoriaID AND eventos.ciudadID = :ciudadID', { categoriasCategoriaID: categoriaID, ciudadID: ciudadID })
        .execute();
        // let eventos: EventosEntity[] = await getRepository(EventosEntity)
        // .createQueryBuilder('eventos')
        // .leftJoin('eventos.eventoID','categorias.eventosEventoID')
        // .where('eventosCategorias.categoriasCategoriaID = :categoriasCategoriaID AND eventos.ciudadID = :ciudadID', { categoriasCategoriaID: categoriaID, ciudadID: ciudadID })
        // .execute();
        return eventos;
    }

    async getEventoById(eventoID: string): Promise<EventosEntity> {
        return this.eventosRepository.findOne(eventoID ,{
            relations: ['creador', 'categorias', 'ciudad'],
          });
    }

    async getInscripcionesByID(eventoID: string): Promise<number[]>{
        // TODO - Devolver un array con los id de los usuarios que estan inscritos al evento
        let inscripciones: number[] = new Array<number>();
        const evento: EventosEntity = await EventosEntity.findOneOrFail(eventoID, {relations: ['categorias', 'creador', 'ciudad']});
        const eventoDto: Evento = await this.mapper.entityToDto(evento);

        if(eventoDto.inscripcion === true){
            inscripciones =  await getConnection()
            .createQueryBuilder()
            .select('eventosInscritos.usuariosUsuarioID')
            .from('usuarios_eventos_inscritos_eventos', 'eventosInscritos')
            .where("eventosInscritos.eventosEventoID = :eventoID", { eventoID: eventoID })
            .execute();
        }
        
        return inscripciones;
    }

    async deleteEvento(eventoID: string): Promise<DeleteResult>{
        return this.eventosRepository.delete(eventoID);
    }

    async newEvento(evento: Evento): Promise<EventosEntity>{
        const newEvento = await this.mapper.dtoToEntity(evento);
        return this.eventosRepository.save(newEvento);
    }

    async updateEvento(eventoID: string, evento: Evento): Promise<EventosEntity>{
        const updateEventoDto: Evento = new Evento(
            eventoID,
            evento.nombre,
            evento.descripcion,
            evento.ubicacion,
            evento.fecha_pub,
            evento.fecha_evento,
            evento.precio,
            evento.inscripcion,
            evento.cancelado,
            evento.duracion,
            evento.creador,
            evento.ciudad,
            evento.categorias
        );

        const updEvento = await this.mapper.dtoToEntity(updateEventoDto);

        await getConnection()
        .createQueryBuilder()
        .update('eventos_categorias_categorias')
        .delete()
        .where('eventosEventoID = :eventosEventoID', { eventosEventoID: updateEventoDto.eventoID })
        .execute();

        await this.deleteEvento(updateEventoDto.eventoID);

        return await this.eventosRepository.save(updEvento);
    }
}