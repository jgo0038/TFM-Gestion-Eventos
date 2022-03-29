export class Categoria {
    categoriaID: number;
    nombre: string;
    descripcion: string;

    constructor(
        categoriaID: number,
        nombre: string,
        descripcion: string
    ){
        this.categoriaID = categoriaID;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}