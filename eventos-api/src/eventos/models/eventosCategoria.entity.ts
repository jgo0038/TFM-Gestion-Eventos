import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('eventos_categorias_categorias')
export class EventosCategoriaEntity extends BaseEntity{

    @PrimaryColumn()
    eventosEventoID: string;

    @PrimaryColumn()
    categoriasCategoriaID: number;

}