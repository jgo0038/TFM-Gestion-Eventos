import { Evento } from "src/eventos/models/eventos.dto";

export class Ciudad {
    ciudadID: number;
    nombre: string;
    descripcion: string;
    eventos: Evento[];

    constructor(
        ciudadID: number,
        nombre: string,
        descripcion: string,
        eventos: Evento[]
    ){
        this.ciudadID = ciudadID;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.eventos = eventos;
    }
}