import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private currentThemeSubject = new BehaviorSubject<string>('blue'); // Inicializa con 'blue'
  private currentModeSubject = new BehaviorSubject<string>('light'); // Inicializa con 'light'

  // Observables para que otros componentes puedan suscribirse
  public currentTheme: Observable<string> = this.currentThemeSubject.asObservable();
  public currentMode: Observable<string> = this.currentModeSubject.asObservable();

  // Métodos para cambiar el tema
  public setBlueTheme(): void {
    this.currentThemeSubject.next('blue');
  }

  public setPinkTheme(): void {
    this.currentThemeSubject.next('pink');
  }

  public setGreenTheme(): void {
    this.currentThemeSubject.next('green');
  }

  // Método para cambiar el modo (oscuro o claro)
  public setDarkMode(value: boolean): void {
    const mode = value ? 'dark' : 'light';
    this.currentModeSubject.next(mode);
  }
}