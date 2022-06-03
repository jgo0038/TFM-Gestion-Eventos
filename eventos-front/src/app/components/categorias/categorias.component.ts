import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  categoriasForm: FormGroup;
  openEdit: boolean = false;
  modificarCategoriaForm: FormGroup;

  constructor(private categoriasService: CategoriasService,
              private fb: FormBuilder,
              private toastr: ToastrService) {
    this.categoriasForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
    this.modificarCategoriaForm = this.fb.group({
      categoriaID: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoriasService.getAllCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias
    })
  }

  borrarCategoria() {
    const categoriaID = this.modificarCategoriaForm.get('categoriaID')?.value;
    console.log(categoriaID)
    if(categoriaID){
      let confirm = window.confirm('Al confirmar se borrará la categoría permanentemente')
      if(confirm){
        this.categoriasService.borrarCategoria(categoriaID).subscribe((res) => {
          this.toastr.success("Categoría borrada correctamente")
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }, error => {
          this.toastr.error('No se pudo borrar la categoría')
        })
      }
    } else {
      this.toastr.error('Selecciona una categoría primero')
    }
  }

  editarCategoria() {
    const categoriaID = this.modificarCategoriaForm.get('categoriaID')?.value;
    if(!categoriaID)
      this.toastr.error('Selecciona una categoria para editar')
    else{
      this.openEdit = true
      this.categoriasService.getCategoriaByID(categoriaID).subscribe((categoria: Categoria) => {
        this.modificarCategoriaForm.patchValue({
          nombre: categoria.nombre,
          descripcion: categoria.descripcion
        })
      })
      
    }
  }

  guardarcategoria(): void {
    const nombre = this.categoriasForm.get('nombre')?.value;
    const descripcion = this.categoriasForm.get('descripcion')?.value;
    if(this.categoriasForm.valid){
      this.categoriasService.crearCategoria(nombre, descripcion).subscribe((res) => {
        this.toastr.success("categoria creada correctamente")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }, error => {
        this.toastr.error("No se pudo crear la categoria")
      })
    }
  }

  updateCategoria(): void {
    const categoriaID = this.modificarCategoriaForm.get('categoriaID')?.value;
    const nombre = this.modificarCategoriaForm.get('nombre')?.value;
    const descripcion = this.modificarCategoriaForm.get('descripcion')?.value;
    if(this.modificarCategoriaForm.valid){
      this.categoriasService.updateCategoria(categoriaID, nombre, descripcion).subscribe((res) => {
        this.toastr.success("categoria modificada correctamente")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }, error => {
        this.toastr.success("No se ha podido modificar la categoria")
      })
    }
    
  }


}
