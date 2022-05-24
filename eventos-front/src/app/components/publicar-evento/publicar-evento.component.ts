import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Ciudad } from 'src/app/models/ciudad';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ImagesService } from 'src/app/services/images.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-publicar-evento',
  templateUrl: './publicar-evento.component.html',
  styleUrls: ['./publicar-evento.component.css']
})
export class PublicarEventoComponent implements OnInit {

  categorias: Categoria[] = [];
  ciudades: Ciudad[] = [];
  continuaForm: boolean = false;
  frontFile: File[] = [];
  files: File[] = [];
  fotoPortada: string = '';
  fotosEvento: string[] = [];
  fotosUploaded: boolean = false;
  publicarEventoForm: FormGroup;
  userID: number = 0;

  constructor(private fb: FormBuilder,
    private router: Router,
    private ciudadesService: CiudadesService,
    private categoriasService: CategoriasService,
    private eventosService: EventosService,
    private imagenesService: ImagesService,
    private usuariosService: UsuariosService,
    private toastr: ToastrService
  ) {
    this.publicarEventoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      fecha_evento: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      inscripcion: ['', [Validators.required]],
      duracion: ['', [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]],
      ciudad: ['', [Validators.required]],
      fotoPortada: [''],
      categorias: ['', [Validators.required]]
    })
    if (localStorage.getItem('email')) {
      this.usuariosService.getUserByMail(localStorage.getItem('email')!).subscribe((usuario) => {
        this.userID = usuario.usuarioID;
      });
    } else {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.ciudadesService.getAllCiudades().subscribe((ciudades) => {
      for (let i = 0; i < ciudades.length; i++) {
        let ciudad: Ciudad = {
          ciudadID: ciudades[i].ciudadID,
          nombre: ciudades[i].nombre,
          descripcion: ciudades[i].descripcion
        }
        this.ciudades.push(ciudad);
      }
    });

    this.categoriasService.getAllCategorias().subscribe((categorias) => {
      for (let i = 0; i < categorias.length; i++) {
        let categoria: Categoria = {
          categoriaID: categorias[i].categoriaID,
          nombre: categorias[i].nombre,
          descripcion: categorias[i].descripcion
        }
        this.categorias.push(categoria);
      }
    })
  }

  crearEvento() {
    const nombre = this.publicarEventoForm.get('nombre')?.value;
    const descripcion = this.publicarEventoForm.get('descripcion')?.value;
    const ubicacion = this.publicarEventoForm.get('ubicacion')?.value;
    const fecha_evento = this.publicarEventoForm.get('fecha_evento')?.value;
    const precio = this.publicarEventoForm.get('precio')?.value;
    const inscripcion = this.publicarEventoForm.get('inscripcion')?.value;
    let duracion = this.publicarEventoForm.get('duracion')?.value;
    const ciudad = this.publicarEventoForm.get('ciudad')?.value;
    const categorias = this.publicarEventoForm.get('categorias')?.value;
    let fecha_pub = new Date();
    duracion = Number(duracion.split(':')[0]) * 60 + Number(duracion.split(':')[1])

    if(this.publicarEventoForm.valid){
      let confirm: boolean = true;
      if(!this.fotosUploaded){
        confirm = window.confirm('Si no ha seleccionado los botones para subir las imágenes no serán actualizadas.¿Desea continuar?')
      }
      if(confirm){
        this.eventosService.publicarEvento(nombre, descripcion, ubicacion, fecha_evento, fecha_pub, precio, inscripcion, duracion, this.userID, ciudad, categorias, this.fotoPortada, this.fotosEvento)
        .subscribe((res: any) => {
          if (res) {
            this.toastr.success('Evento creado correctamente')
            this.router.navigate(['/eventos'])
          } else {
            this.toastr.error('Error al crear el evento')
          }
        })
      }
    }
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onSelectFront(event: any) {
    this.frontFile.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRemoveFront(event: any) {
    this.frontFile.splice(this.files.indexOf(event), 1);
  }

  onUploadEventImages() {
    this.fotosUploaded = true;
    // Fotos evento
    for (let i = 0; i < this.files.length; i++) {
      const file_data = this.files[i];
      const data = new FormData();
      let fotoEvento = '';
      data.append('file', file_data);
      data.append('upload_preset', 'eventos_cloudinary');
      data.append('cloud_name', 'dopt5keee');

      this.imagenesService.uploadImagen(data).subscribe((res: any) => {
        if (res) {
          fotoEvento = res.secure_url;
          this.fotosEvento.push(fotoEvento);
          this.toastr.success('Imagen subida correctamente');
        }
      }, error => {
        this.toastr.error('No se pudo subir la imagen')
      });
    }
  }

  onUploadFrontImage() {
    this.fotosUploaded = true;
    // Foto portada
    const file_data = this.frontFile[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'eventos_cloudinary');
    data.append('cloud_name', 'dopt5keee');

    this.imagenesService.uploadImagen(data).subscribe((res: any) => {
      if (res) {
        this.fotoPortada = res.secure_url;
        this.fotosEvento.push(this.fotoPortada);
        this.toastr.success('Imagen subida correctamente');
      }
    }, error => {
      this.toastr.error('No se pudo subir la imagen')
    });
  }

  showFullForm() {
    this.continuaForm = !this.continuaForm;
    const form2 = document.getElementById('eventoForm2');
    const selectCiudad = document.getElementById('selectCiudad');
    if (this.publicarEventoForm.get('ciudad')?.value !== '')
      form2!.style.display = 'block'
    else
      this.toastr.error('Selecciona una ciudad')
  }

}
