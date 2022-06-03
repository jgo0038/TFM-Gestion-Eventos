import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ciudad } from 'src/app/models/ciudad';
import { CiudadesService } from 'src/app/services/ciudades.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  ciudades: Ciudad[] = [];
  ciudadesForm: FormGroup;
  openEdit: boolean = false;
  modificarCiudadForm: FormGroup;

  constructor(private fb: FormBuilder,
              private ciudadesService: CiudadesService,
              private toastr: ToastrService) {
    this.ciudadesForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
    this.modificarCiudadForm = this.fb.group({
      ciudadID: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.ciudadesService.getAllCiudades().subscribe((ciudades: Ciudad[]) => {
      this.ciudades = ciudades
    })
  }

  borrarCiudad() {
    const ciudadID = this.modificarCiudadForm.get('ciudadID')?.value;
    
    if(ciudadID){
      let confirm = window.confirm('Si borra la ciudad se borrarán sus eventos también')
      if(confirm){
        this.ciudadesService.deleteCiudad(ciudadID).subscribe((res) => {
          this.toastr.success("Ciudad borrada correctamente")
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }, error => {
          this.toastr.error('No se pudo borrar la ciudad')
        })
      }
    } else {
      this.toastr.error('Selecciona una ciudad primero')
    }
  }

  editarCiudad() {
    const ciudadID = this.modificarCiudadForm.get('ciudadID')?.value;
    if(!ciudadID)
      this.toastr.error('Selecciona una ciudad para editar')
    else{
      this.openEdit = true
      this.ciudadesService.getCiudadByID(ciudadID).subscribe((ciudad: Ciudad) => {
        this.modificarCiudadForm.patchValue({
          nombre: ciudad.nombre,
          descripcion: ciudad.descripcion
        })
      })
      
    }
  }

  guardarCiudad(): void {
    const nombre = this.ciudadesForm.get('nombre')?.value;
    const descripcion = this.ciudadesForm.get('descripcion')?.value;
    if(this.ciudadesForm.valid){
      this.ciudadesService.crearCiudad(nombre, descripcion).subscribe((res) => {
        this.toastr.success("Ciudad creada correctamente")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }, error => {
        this.toastr.error("No se pudo crear la ciudad")
      })
    }
  }

  updateCiudad(): void {
    const ciudadID = this.modificarCiudadForm.get('ciudadID')?.value;
    const nombre = this.modificarCiudadForm.get('nombre')?.value;
    const descripcion = this.modificarCiudadForm.get('descripcion')?.value;
    if(this.modificarCiudadForm.valid){
      this.ciudadesService.updateCiudad(ciudadID, nombre, descripcion).subscribe((res) => {
        this.toastr.success("Ciudad modificada correctamente")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }, error => {
        this.toastr.success("No se ha podido modificar la ciudad")
      })
    }
    
  }
}
