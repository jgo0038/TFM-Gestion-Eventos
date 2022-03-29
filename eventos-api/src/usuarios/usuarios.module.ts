import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './models/usuarios.entity';
import { UsuariosRepository } from './usuarios.repository';
import { UsuariosMapper } from './usuarios.mapper';

@Module({
  imports: [
      TypeOrmModule.forFeature([UsuariosEntity])
  ],
  providers: [
    UsuariosService,
    UsuariosMapper,
    UsuariosRepository
    ],
  controllers: [UsuariosController],
  exports: [UsuariosService]
})
export class UsuariosModule {}
