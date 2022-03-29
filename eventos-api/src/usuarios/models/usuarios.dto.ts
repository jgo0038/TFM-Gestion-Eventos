import { Evento } from "src/eventos/models/eventos.dto";
import { EventosEntity } from "src/eventos/models/eventos.entity";

export class Usuario {
    usuarioID?: number;
    mail: string;
    nombre: string;
    apellidos?: string;
    fecha_nac: Date;
    telefono: number;
    particular: boolean;
    negocio: boolean;
    descripcion?: string;
    ubicacion?: string;
    contraseña: string;
    eventosCreados?: string[];
    eventosInscritos?: string[];
    // eventosCreados?: Evento[];
    // eventosInscritos?: Evento[];

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
        eventosCreados?: string[],
        eventosInscritos?: string[]
        // eventosCreados?: Evento[],
        // eventosInscritos?: Evento[]
    ){
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