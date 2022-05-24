import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Ciudad } from 'src/app/models/ciudad';
import { Evento } from 'src/app/models/evento';
import { Usuario } from 'src/app/models/usuario';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ImagesService } from 'src/app/services/images.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {

  categorias: Categoria[] = [];
  ciudadID: number | undefined;
  editarEventoForm: FormGroup;
  evento: Evento = {
    eventoID: '',
    nombre: '',
    descripcion: '',
    ubicacion: '',
    fecha_pub: new Date(),
    fecha_evento: new Date(),
    precio: 0,
    inscripcion: false,
    cancelado: false,
    duracion: 0,
    creador: '',
    ciudad: '',
    fotoPortada: '',
    fotosEvento: [''],
    categorias: [],
    comentarios: [],
  }
  eventoID: string;
  frontFile: File[] = [];
  files: File[] = [];
  fotoPortada: string = '';
  fotosEvento: string[] = [];
  fotosUploaded: boolean = false;
  usuarioID: number | undefined;

  constructor(private fb: FormBuilder,
              private categoriasService: CategoriasService,
              private ciudadesService: CiudadesService,
              private eventosService: EventosService,
              private usuariosService: UsuariosService,
              private activatedRoute: ActivatedRoute,
              private imagenesService: ImagesService,
              private router: Router,
              private toastr: ToastrService) {

    this.eventoID = this.activatedRoute.snapshot.paramMap.get('eventoID')!;   
    this.usuariosService.getUserByMail(localStorage.getItem('email')!).subscribe((user: Usuario) => {
      this.usuarioID = user.usuarioID
    })

    this.editarEventoForm = this.fb.group({
      nombre: [this.evento.nombre, [Validators.required]],
      descripcion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      fecha_evento: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      inscripcion: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      fotoPortada: [''],
      categorias: ['', [Validators.required]],
      mantenerImagenes: ['']
    })
   }

  ngOnInit(): void {

    this.eventosService.getEventosByID(this.eventoID).subscribe((evento: Evento) => {
      if(evento){
        if(localStorage.getItem('email') !== evento.creador){
          this.router.navigate(['/'])
        } else {
          this.evento = evento
          this.editarEventoForm.patchValue({
            nombre: evento.nombre,
            descripcion: evento.descripcion,
            ubicacion: evento.ubicacion,
            fecha_evento: evento.fecha_evento,
            precio: evento.precio,
            inscripcion: evento.inscripcion,
            duracion: evento.duracion,
            fotoPortada: evento.fotoPortada,
            categorias: evento.categorias
          })
          this.ciudadesService.getAllCiudades().subscribe((ciudades: Ciudad[]) => {
            ciudades.map((ciudad) => {
              if(ciudad.nombre === evento.ciudad)
                this.ciudadID = ciudad.ciudadID
            })
          })
        }
      }
    }, error => {
      this.router.navigate(['/'])
    })

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

  guardarEvento(): void {
    const nombre = this.editarEventoForm.get('nombre')?.value;
    const descripcion = this.editarEventoForm.get('descripcion')?.value;
    const ubicacion = this.editarEventoForm.get('ubicacion')?.value;
    const fecha_evento = this.editarEventoForm.get('fecha_evento')?.value;
    const precio = this.editarEventoForm.get('precio')?.value;
    const inscripcion = this.editarEventoForm.get('inscripcion')?.value;
    const duracion = this.editarEventoForm.get('duracion')?.value;
    const categorias = this.editarEventoForm.get('categorias')?.value;

    if(this.editarEventoForm.valid){
      let confirm: boolean = true;
      if(!this.fotosUploaded){
        confirm = window.confirm('Si no ha seleccionado los botones para subir las imágenes no serán actualizadas.¿Desea continuar?')
      }
      if(confirm){
        this.eventosService.updateEvento(this.eventoID, nombre, descripcion, ubicacion,
          fecha_evento, this.evento.fecha_pub, precio, inscripcion, duracion,
          this.usuarioID!, this.ciudadID!, categorias, this.fotoPortada, this.fotosEvento).subscribe((res) => {
            this.router.navigate(['/perfil'])
            this.toastr.success('El evento se ha actualizado correctamente')
          }, error => {
            this.toastr.error('No se ha podido actualizar el evento')
          })
      }
    }
    
  }

  mantenerFoto(event: any, foto: any): void {
    if(this.fotosEvento.includes(foto)){
      this.fotosEvento.splice(this.fotosEvento.indexOf(foto), 1);
    } else {
      this.fotosEvento.push(foto)
    }
  }

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onSelectFront(event: any): void {
    this.frontFile.push(...event.addedFiles);
  }

  onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRemoveFront(event: any): void {
    this.frontFile.splice(this.files.indexOf(event), 1);
  }

  onUploadEventImages(): void {
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

  onUploadFrontImage(): void {
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
}
