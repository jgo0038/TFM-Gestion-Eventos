import { Categoria } from "./categoria";

export interface Evento {
    eventoID: string;
    nombre: string;
    descripcion: string;
    ubicacion: string;
    fecha_pub: Date;
    fecha_evento: Date;
    precio: number;
    inscripcion: boolean;
    cancelado: boolean;
    duracion: number;
    creador: string;
    ciudad: string;
    fotoPortada: string;
    fotosEvento: string;
    categorias: Categoria[];
    comentarios: number[];
}