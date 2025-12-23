// max-6int-2dec.directive.ts
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMax6Int2Dec]'
})
export class Max6Int2DecDirective {
  // hasta 6 dígitos enteros y opcionalmente .xx
  private readonly re = /^(?:\d{0,4})(?:\.\d{0,2})?$/;

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    const el = e.target as HTMLInputElement;
    let v = (el.value || '').replace(',', '.'); // por si teclean coma
    // elimina todo excepto dígitos y punto
    v = v.replace(/[^0-9.]/g, '');

    // evita más de un punto
    const parts = v.split('.');
    if (parts.length > 2) v = `${parts[0]}.${parts.slice(1).join('')}`;

    // recorta por regla
    if (!this.re.test(v)) {
      const [ent, dec = ''] = v.split('.');
      const ent6 = (ent || '').slice(0, 4);
      const dec2 = (dec || '').slice(0, 2);
      v = dec.length ? `${ent6}.${dec2}` : ent6;
    }

    // set sin bucles
    if (el.value !== v) {
      const ctrl = this.ngControl.control;
      el.value = v;
      ctrl?.setValue(v, { emitEvent: false });
    }
  }
}
