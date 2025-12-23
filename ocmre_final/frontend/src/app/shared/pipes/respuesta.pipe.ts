import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'respuesta'
})
export class RespuestaPipe implements PipeTransform {
  transform(value: any): any {
    if (value === 'S') return 'Sí';
    if (value === 'N') return 'No';
    if (value === 'X') return 'En proceso';
    if (value === null || value === undefined || value === '') return '-';
    return value;
  }
}
