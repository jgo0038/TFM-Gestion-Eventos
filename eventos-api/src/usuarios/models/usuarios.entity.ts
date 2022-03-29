import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ComentariosEntity } from 'src/comentarios/models/comentarios.entity';
import { EventosEntity } from "src/eventos/models/eventos.entity";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class UsuariosEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    usuarioID: number;

    @Column({unique: true})
    mail: string;

    @Column()
    nombre: string;

    @Column({nullable: true})
    apellidos: string;

    @Column()
    fecha_nac: Date;

    @Column()
    telefono: number;

    @Column()
    particular: boolean;

    @Column()
    negocio: boolean;

    @Column({nullable: true})
    descripcion: string;

    @Column({nullable: true})
    ubicacion: string;

    @Column({ type: 'varchar', length: 70 })
    contraseña: string;

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.contraseña = await bcrypt.hash(this.contraseña, salt);
    }

    async validarContraseña(contraseña: string): Promise<boolean> {
        return bcrypt.compareSync(contraseña, this.contraseña);
    }

    @OneToMany(() => EventosEntity, evento => evento.creador)
    eventosCreados: EventosEntity[];

    @OneToMany(() => ComentariosEntity, comentario => comentario.creador)
    comentarios: ComentariosEntity[];

    @ManyToMany(() => EventosEntity, {
        cascade: true,
    })
    @JoinTable()
    eventosInscritos: EventosEntity[];

    constructor(
        usuarioID: number,
        mail: string,
        nombre: string,
        apellidos: string,
        fecha_nac: Date,
        telefono: number,
        particular: boolean,
        negocio: boolean,
        descripcion: string,
        ubicacion: string,
        contraseña: string,
        eventosCreados?: EventosEntity[],
        eventosInscritos?: EventosEntity[]
    ){
        super();
        this.usuarioID = usuarioID;
        this.mail = mail;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fecha_nac = fecha_nac;
        this.telefono = telefono;
        this.particular = particular;
        this.negocio = negocio;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.contraseña = contraseña;
        this.eventosCreados = eventosCreados;
        this.eventosInscritos = eventosInscritos;
    }
}