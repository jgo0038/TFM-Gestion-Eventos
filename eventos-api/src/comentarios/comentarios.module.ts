import { Module } from '@nestjs/common';
import { ComentariosService } from './services/comentarios.service';
import { ComentariosController } from './controllers/comentarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentariosEntity } from './models/comentarios.entity';
import { ComentariosMapper } from './comentarios.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComentariosEntity])],
  providers: [
    ComentariosService,
    ComentariosMapper],
  controllers: [ComentariosController]
})
export class ComentariosModule {}
