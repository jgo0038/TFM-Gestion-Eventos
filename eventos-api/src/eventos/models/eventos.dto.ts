import { Categoria } from "src/categorias/models/categorias.dto";

export class Evento {
    readonly eventoID?: string;
    readonly nombre: string;
    readonly descripcion: string;
    readonly ubicacion: string;
    readonly fecha_pub: Date;
    readonly fecha_evento: Date;
    readonly precio: number;
    readonly inscripcion: boolean;
    readonly cancelado: boolean;
    readonly duracion: number;
    readonly creador: string;
    readonly ciudad: string;
    readonly categorias: Categoria[];
    readonly comentarios: number[];

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
        creador: string,
        ciudad: string,
        categorias: Categoria[],
        
        
      ) {
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