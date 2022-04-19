import { Evento } from "./evento";

export interface Ciudad {
    ciudadID: number;
    nombre: string;
    descripcion: string;
    eventos: Evento[];
}