import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextOnly]'
})
export class TextOnlyDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const pattern = /[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/;
    const isBackspace = event.key === 'Backspace';
    const isDelete = event.key === 'Delete';
    const isArrowKey = event.key.startsWith('Arrow');
    const isTab = event.key === 'Tab';

    if (!pattern.test(event.key) && !isBackspace && !isDelete && !isArrowKey && !isTab) {
      event.preventDefault();
    }
  }
}