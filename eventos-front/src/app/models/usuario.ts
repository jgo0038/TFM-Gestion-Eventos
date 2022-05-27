import { Evento } from "./evento";

export interface Usuario {
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
    genero: string;
    foto?: string;
    eventosCreados?: Evento[];
    eventosInscritos?: Evento[];
}