// import { Directive, HostListener } from '@angular/core';

// @Directive({
//   selector: 'input[type=number][noNegativos]'
// })
// export class NoNegativosDirective {

//   @HostListener('keydown', ['$event'])
//   onKeyDown(event: KeyboardEvent): void {
//     const invalidKeys = ['-', '+', 'e', 'E'];
    
//     if (invalidKeys.includes(event.key)) {
//       event.preventDefault(); // 🚫 Bloquea - + e E
//     }
//   }

//   @HostListener('paste', ['$event'])
//   onPaste(event: ClipboardEvent): void {
//     const pastedInput = event.clipboardData?.getData('text/plain') ?? '';
//     if (!/^\d+$/.test(pastedInput)) {
//       event.preventDefault(); // 🚫 Solo se permite pegar números enteros positivos
//     }
//   }
// }




import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type=number][noNegativos]'
})
export class NoNegativosDirective {

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const invalidKeys = ['-', '+', 'e', 'E'];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const pastedInput = event.clipboardData?.getData('text/plain') ?? '';
    if (!/^\d+$/.test(pastedInput)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (Number(value) < 0) {
      const correctedValue = '0';
      input.value = correctedValue;

      // Esta línea es necesaria para que Angular lo detecte como cambio real
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeInputValueSetter?.call(input, correctedValue);

      const ev2 = new Event('input', { bubbles: true });
      input.dispatchEvent(ev2);
    }
  }
}
