import { CategoriasEntity } from "src/categorias/models/categorias.entity";
import { CiudadesEntity } from "src/ciudades/models/ciudades.entity";
import { ComentariosEntity } from "src/comentarios/models/comentarios.entity";
import { UsuariosEntity } from "src/usuarios/models/usuarios.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('eventos')
export class EventosEntity extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    eventoID: string;

    @Column()
    nombre: string;

    @Column()
    ubicacion: string;

    @Column()
    descripcion: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fecha_pub: Date;

    @Column()
    fecha_evento: Date;

    @Column()
    precio: number;

    @Column()
    inscripcion: boolean;

    @Column({ default: false })
    cancelado: boolean;

    @Column()
    duracion: number;

    @ManyToOne(() => UsuariosEntity, usuario => usuario.eventosCreados, { onDelete: 'CASCADE' })
    creador: UsuariosEntity;

    @ManyToOne(() => CiudadesEntity, ciudad => ciudad.eventos, { onDelete: 'CASCADE' })
    ciudad: CiudadesEntity;
    
    @OneToMany(() => ComentariosEntity, comentario => comentario.evento)
    comentarios: ComentariosEntity[];

    @ManyToMany(() => CategoriasEntity, {
      cascade: true,
    })
    @JoinTable()
    categorias: CategoriasEntity[];

    constructor(
        eventoID: string,
        nombre: string,
        descripcion: string,
        ubicacion: string,
        fecha_pub: Date,
        fecha_evento: Date,
        precio: number,
        inscripcion: boolean,
        cancelado: boolean,
        duracion: number,
        creador: UsuariosEntity,
        ciudad: CiudadesEntity,
        categorias: CategoriasEntity[],
      ) {
        super();
        this.eventoID = eventoID;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.fecha_pub = fecha_pub;
        this.fecha_evento = fecha_evento;
        this.precio = precio;
        this.inscripcion = inscripcion;
        this.cancelado = cancelado;
        this.duracion = duracion;
        this.creador = creador;
        this.ciudad = ciudad;
        this.categorias = categorias;
      }
}