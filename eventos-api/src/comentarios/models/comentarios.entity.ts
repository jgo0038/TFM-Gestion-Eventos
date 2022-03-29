import { EventosEntity } from "src/eventos/models/eventos.entity";
import { UsuariosEntity } from "src/usuarios/models/usuarios.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comentarios')
export class ComentariosEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    comentarioID: number;

    @Column()
    titulo: string;

    @Column()
    texto: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fecha: Date;

    @ManyToOne(() => UsuariosEntity, usuario => usuario.comentarios, { onDelete: 'CASCADE' })
    creador: UsuariosEntity;

    @ManyToOne(() => EventosEntity, evento => evento.comentarios, { onDelete: 'CASCADE' })
    evento: EventosEntity;

    constructor(
        comentarioID: number,
        titulo: string,
        texto: string,
        fecha: Date,
        creador: UsuariosEntity,
        evento: EventosEntity
      ) {
        super();
        this.comentarioID = comentarioID,
        this.titulo = titulo,
        this.texto = texto,
        this.fecha = fecha,
        this.creador = creador,
        this.evento = evento
      }
}