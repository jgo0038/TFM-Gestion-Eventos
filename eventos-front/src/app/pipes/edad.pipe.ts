import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(value: Date): number {
    let hoy = new Date()
    let valueDate: Date = new Date(value)
    let edad: number = hoy.getFullYear() - new Date(value).getFullYear()
    return edad;
  }

}
