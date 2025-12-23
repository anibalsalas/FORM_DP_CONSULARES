import { Directive, HostBinding, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMax2Digits]',
  standalone: true
})
export class Max2DigitsDirective {
  private readonly MAX = 2;

  // Sugerir teclado numérico y ayudar al navegador
  @HostBinding('attr.inputmode') inputmode = 'numeric';
  @HostBinding('attr.pattern') pattern = '\\d{0,2}';
  @HostBinding('attr.maxlength') maxlength = this.MAX;
  @HostBinding('attr.autocomplete') autocomplete = 'off';

  private composing = false;

  constructor(@Optional() private ngControl: NgControl) {}

  /** Permite navegación/edición y dígitos; bloquea lo demás */
  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    const allowed = [
      'Backspace','Delete','Tab','Escape','Enter',
      'Home','End','ArrowLeft','ArrowRight'
    ];
    const ctrl = e.ctrlKey || e.metaKey;
    const k = e.key;

    if (allowed.includes(k) || (ctrl && /^[acvxyz]$/i.test(k))) return;
    if (!/^\d$/.test(k)) e.preventDefault();
  }

  @HostListener('compositionstart') onCompStart() { this.composing = true; }
  @HostListener('compositionend', ['$event'])
  onCompEnd(evt: CompositionEvent) { this.composing = false; this.onInput(evt as any); }

  /** Bloquea inserciones que excedan 2 dígitos o no sean números */
  @HostListener('beforeinput', ['$event'])
  onBeforeInput(e: InputEvent) {
    if (!('data' in e)) return;
    const el = e.target as HTMLInputElement;
    const data = (e as any).data as string | null;
    if (data === null) return;

    const start = el.selectionStart ?? el.value.length;
    const end   = el.selectionEnd ?? el.value.length;
    const next  = el.value.slice(0, start) + data + el.value.slice(end);

    if (!/^\d*$/.test(next) || next.length > this.MAX) {
      e.preventDefault();
    }
  }

  /** Sanea siempre (pegar, autofill, fin de IME, etc.) */
  @HostListener('input', ['$event'])
  onInput(e: InputEvent) {
    if (this.composing) return;
    const el = e.target as HTMLInputElement;
    const onlyDigits = (el.value || '').replace(/\D+/g, '').slice(0, this.MAX);

    if (el.value !== onlyDigits) {
      el.value = onlyDigits;
      this.ngControl?.control?.setValue(onlyDigits, { emitEvent: true });
    }
  }

  /** Pegar: filtra a dígitos y recorta a 2 */
  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    const clip = e.clipboardData?.getData('text') ?? '';
    const clean = clip.replace(/\D+/g, '').slice(0, this.MAX);
    if (clean.length === 0) {
      e.preventDefault();
    }
  }
}
