import { Module } from '@nestjs/common';
import { CiudadesService } from './services/ciudades.service';
import { CiudadesController } from './controllers/ciudades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadesEntity } from './models/ciudades.entity';
import { CiudadesMapper } from './ciudades.mapper';

@Module({
  imports: [
      TypeOrmModule.forFeature([CiudadesEntity])
  ],
  providers: [
    CiudadesService,
    CiudadesMapper
    ],
  controllers: [CiudadesController]
})
export class CiudadesModule {}
