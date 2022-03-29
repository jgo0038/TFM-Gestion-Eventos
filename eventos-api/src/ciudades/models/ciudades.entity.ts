import { EventosEntity } from "src/eventos/models/eventos.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ciudades')
export class CiudadesEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    ciudadID: number;

    @Column({unique: true})
    nombre: string;

    @Column()
    descripcion: string;

    @OneToMany(() => EventosEntity, (evento) => evento.ciudad)
    eventos: EventosEntity[];

    constructor(
        ciudadID: number,
        nombre: string,
        descripcion: string,
    ){
        super();
        this.ciudadID = ciudadID;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}