import { Module } from '@nestjs/common';
import { EventosService } from './services/eventos.service';
import { EventosController } from './controllers/eventos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosEntity } from './models/eventos.entity';
import { EventosRepository } from './eventos.repository';
import { EventosMapper } from './eventos.mapper';
import { EventosCategoriaEntity } from './models/eventosCategoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventosEntity])  ],
  providers: [
    EventosService,
    EventosRepository,
    EventosMapper,
    EventosCategoriaEntity
  ],
  controllers: [EventosController]
})
export class EventosModule {}
