export class Comentario {
    readonly comentarioID: number;
    readonly titulo: string;
    readonly texto: string;
    readonly fecha: Date;
    readonly creador: number;
    readonly evento: string;

    constructor(
        comentarioID: number,
        titulo: string,
        texto: string,
        fecha: Date,
        creador: number,
        evento: string,
    ){
        this.comentarioID = comentarioID;
        this.titulo = titulo;
        this.texto = texto;
        this.fecha = fecha;
        this.creador = creador;
        this.evento = evento;
    }
}