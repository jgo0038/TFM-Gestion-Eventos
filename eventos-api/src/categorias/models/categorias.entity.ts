import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class CategoriasEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    categoriaID: number;

    @Column({unique: true})
    nombre: string;

    @Column()
    descripcion: string;

    constructor(
        categoriaID: number,
        nombre: string,
        descripcion: string
    ){
        super();
        this.categoriaID = categoriaID;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}