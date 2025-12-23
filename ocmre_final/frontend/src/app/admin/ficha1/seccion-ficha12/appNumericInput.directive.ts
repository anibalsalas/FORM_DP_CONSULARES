import { Directive, HostBinding, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumericInput]', // Selector actualizado
  standalone: true
})
export class NumericInputDirective { // Nombre de clase actualizado
  // Nuevas constantes para enteros y decimales
  private readonly MAX_INT = 8;
  private readonly MAX_DEC = 2;

  // Sugerir teclado decimal
  @HostBinding('attr.inputmode') inputmode = 'decimal';
  
  // Patrón actualizado: 0-8 dígitos, opcionalmente un punto y 0-2 decimales
  @HostBinding('attr.pattern') pattern = `^\\d{0,${this.MAX_INT}}(\\.\\d{0,${this.MAX_DEC}})?$`;
  
  // Maxlength total (8 enteros + 1 punto + 2 decimales)
  @HostBinding('attr.maxlength') maxlength = this.MAX_INT + 1 + this.MAX_DEC;
  
  @HostBinding('attr.autocomplete') autocomplete = 'off';

  private composing = false;

  constructor(@Optional() private ngControl: NgControl) {}

  /** Evita teclas no numéricas. Permite navegación, edición, atajos y UN punto. */
  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    const allowed = [
      'Backspace','Delete','Tab','Escape','Enter',
      'Home','End','ArrowLeft','ArrowRight'
    ];
    const ctrl = e.ctrlKey || e.metaKey; // Abarca Ctrl (Win) y Cmd (Mac)
    const k = e.key;

    // Permitir navegación, atajos (copiar, pegar, etc.)
    if (allowed.includes(k) || (ctrl && /^[acvxyz]$/i.test(k))) {
      return;
    }

    const el = e.target as HTMLInputElement;
    
    // Bloquear si es un punto y ya existe uno
    if (k === '.' && el.value.includes('.')) {
      e.preventDefault();
      return;
    }

    // Permitir solo dígitos 0..9 y el (primer) punto
    if (!/^[\d\.]$/.test(k)) {
      e.preventDefault();
    }
  }

  /** IME (teclados de composición) */
  @HostListener('compositionstart') onCompStart() { this.composing = true; }
  @HostListener('compositionend', ['$event'])
  onCompEnd(evt: CompositionEvent) { this.composing = false; this.onInput(evt as any); }

  /** Bloquea inserciones (tecleo) que excedan los límites de enteros o decimales */
  @HostListener('beforeinput', ['$event'])
  onBeforeInput(e: InputEvent) {
    // Si está componiendo (IME) o no es 'insertText', dejar que 'onInput' limpie
    if (this.composing || e.inputType !== 'insertText' || !('data' in e)) return;
    
    const data = (e as any).data as string | null;
    
    // Solo nos interesa el 'data' de un solo dígito (tecleo)
    if (data === null || data.length > 1 || !/^\d$/.test(data)) {
      return;
    }
    
    const el = e.target as HTMLInputElement;
    const [integer, decimal] = el.value.split('.');
    const dotIndex = el.value.indexOf('.');
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;

    // Si el cursor está en la parte decimal (y no hay selección)
    if (dotIndex !== -1 && start > dotIndex && start === end) {
      if (decimal && decimal.length >= this.MAX_DEC) {
        e.preventDefault(); // Decimal está lleno
      }
    } 
    // Si el cursor está en la parte entera (y no hay selección)
    else if (start === end) {
      const intPart = dotIndex !== -1 ? integer : el.value.replace(/\D/g, '');
      if (intPart && intPart.length >= this.MAX_INT) {
        // Si no hay punto, o el cursor está antes del punto
        if (dotIndex === -1 || start <= dotIndex) {
            e.preventDefault(); // Entero está lleno
        }
      }
    }
  }

  /**
   * Sanitiza SIEMPRE: pega, drag, autofill, fin de IME, etc.
   * Es el limpiador final que asegura el formato 8.2
   */
  @HostListener('input', ['$event'])
  onInput(e: InputEvent) {
    if (this.composing) return;
    
    const el = e.target as HTMLInputElement;
    let value = el.value;
    if (!value) return;

    // 1. Quitar caracteres no válidos (todo excepto dígitos y el *primer* punto)
    value = value.replace(/[^\d\.]/g, ''); // Quita todo menos dígitos y puntos
    const parts = value.split('.');
    let integer = parts[0] || '';
    let decimal = parts.slice(1).join(''); // Junta cualquier cosa después del primer punto

    // 2. Truncar partes a sus longitudes máximas
    integer = integer.slice(0, this.MAX_INT);
    decimal = decimal.slice(0, this.MAX_DEC);

    // 3. Reconstruir el valor final
    // (parts.length > 1) significa que hubo al menos un punto
    const finalValue = parts.length > 1 ? `${integer}.${decimal}` : integer;
    
    if (el.value !== finalValue) {
      // Guardar posición del cursor para restaurarla
      const start = el.selectionStart ?? 0;
      const valDiff = el.value.length - finalValue.length;
      
      el.value = finalValue;
      
      // Sincroniza con Reactive Forms si existe
      this.ngControl?.control?.setValue(finalValue, { emitEvent: true });

      // Restaurar posición del cursor
      const newPos = Math.max(0, start - valDiff);
      el.setSelectionRange(newPos, newPos);
    }
  }

  // Se elimina el 'onPaste' original.
  // El 'onInput' es más robusto y se dispara DESPUÉS de pegar,
  // limpiando cualquier formato no válido que se haya pegado.
}