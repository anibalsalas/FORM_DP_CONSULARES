import { Directive, HostBinding, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMax3Digits]',
  standalone: true
})
export class Max3DigitsDirective {
  private readonly MAX = 3;

  @HostBinding('attr.inputmode') inputmode = 'numeric';
  @HostBinding('attr.pattern') pattern = '\\d{0,3}';
  @HostBinding('attr.maxlength') maxlength = this.MAX;
  @HostBinding('attr.autocomplete') autocomplete = 'off';

  private composing = false;

  constructor(@Optional() private ngControl: NgControl) {}

  /** Evita teclas no numéricas. Permite navegación, edición y atajos. */
  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    const allowed = [
      'Backspace','Delete','Tab','Escape','Enter',
      'Home','End','ArrowLeft','ArrowRight'
    ];
    const ctrl = e.ctrlKey || e.metaKey;
    const k = e.key;

    if (allowed.includes(k) || (ctrl && /^[acvxyz]$/i.test(k))) return;

    // Solo dígitos 0..9
    if (!/^\d$/.test(k)) e.preventDefault();
  }

  /** 
   * Previene el cambio de valor con la rueda del mouse (scroll).
   * Soluciona el warning: "Added non-passive event listener to a scroll-blocking 'wheel' event"
   */
  @HostListener('wheel', ['$event'])
  onWheel(e: WheelEvent) {
    const el = e.target as HTMLInputElement;
    // Solo prevenir si el input está enfocado o es tipo number
    if (document.activeElement === el || el.type === 'number') {
      e.preventDefault();
    }
  }

  /** IME (teclados de composición) */
  @HostListener('compositionstart') onCompStart() { this.composing = true; }
  @HostListener('compositionend', ['$event'])
  onCompEnd(evt: CompositionEvent) { this.composing = false; this.onInput(evt as any); }

  /** Bloquea inserciones que no sean dígitos o excedan el máximo */
  @HostListener('beforeinput', ['$event'])
  onBeforeInput(e: InputEvent) {
    // en algunos casos e.data es null (deletions, etc.)
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

  /** Sanitiza siempre: pega, drag, autofill, fin de IME, etc. */
  @HostListener('input', ['$event'])
  onInput(e: InputEvent) {
    if (this.composing) return;
    const el = e.target as HTMLInputElement;
    const onlyDigits = (el.value || '').replace(/\D+/g, '').slice(0, this.MAX);

    if (el.value !== onlyDigits) {
      el.value = onlyDigits;
      // sincroniza con Reactive Forms si existe
      this.ngControl?.control?.setValue(onlyDigits, { emitEvent: true });
    }
  }

  /** Pegar: filtra a dígitos y recorta a 3 */
  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    const clip = e.clipboardData?.getData('text') ?? '';
    const clean = clip.replace(/\D+/g, '').slice(0, this.MAX);
    if (clean.length === 0) {
      e.preventDefault();
      return;
    }
    // Permitimos el paste; 'input' volverá a sanear si hace falta
  }
}