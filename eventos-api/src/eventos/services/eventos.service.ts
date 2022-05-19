import { Injectable, Logger } from '@nestjs/common';
import { DeleteResult} from 'typeorm';
import { EventosMapper } from '../eventos.mapper';
import { EventosRepository } from '../eventos.repository';
import { Evento } from '../models/eventos.dto';
import { EventosEntity } from '../models/eventos.entity';

@Injectable()
export class EventosService {
    constructor(
    private readonly eventosRepository: EventosRepository,
    private mapper: EventosMapper
    ){}

    async createEvento(evento: Evento): Promise<Evento> {
        const newEvento: EventosEntity = await this.eventosRepository.newEvento(evento);
        return this.mapper.entityToDto(newEvento);
    }

    async getAllEventos(): Promise<Evento[]> {
        const eventos: EventosEntity[] = await this.eventosRepository.getAllEventos();
        return eventos.map((evento) => this.mapper.entityToDto(evento));
    }

    async getEventosByCategoria(ciudadID: number): Promise<Evento[]>{
        const eventos: EventosEntity[] = await this.eventosRepository.getEventosByCategoria(ciudadID);
        if(eventos){
            return eventos.map((evento) => this.mapper.entityToDto(evento));
        }
    }

    async getEventosByCiudad(ciudadID: number): Promise<Evento[]>{
        const eventos: EventosEntity[] = await this.eventosRepository.getEventosByCiudad(ciudadID);
        return eventos.map((evento) => this.mapper.entityToDto(evento));

    }

    async getEventosByCiudadCategoria(ciudadID: number, categoriaID: number): Promise<Evento[]>{
        const eventos: EventosEntity[] = await this.eventosRepository.getEventosByCiudadCategoria(ciudadID, categoriaID);
        return eventos.map((evento) => this.mapper.entityToDto(evento));

    }

    async getEventoById(eventoID: string): Promise<Evento> {
        const evento: EventosEntity = await this.eventosRepository.getEventoById(eventoID);
        return this.mapper.entityToDto(evento);
    }

    async getInscripcionesByID(eventoID: string): Promise<number[]> {
        const inscripciones: number[] = await this.eventosRepository.getInscripcionesByID(eventoID);
        return inscripciones;
    }

    async deleteEvento(eventoID: string): Promise<DeleteResult> {
        return await this.eventosRepository.deleteEvento(eventoID);
    }

    async updateEvento(eventoID: string, evento: Evento): Promise<EventosEntity> {
        return await this.eventosRepository.updateEvento(eventoID, evento);
    }

}
