import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SeccionKey = 's1'|'s2'|'s3'|'s4'|'s5'|'s6'|'s7'|'s8'|'s9'|'s10'|'s11'|'s12'|'s13';
export interface SeccionState { completada: boolean; validada: boolean; }
export type StatusMap = Record<SeccionKey, SeccionState>;

const SECCIONES: SeccionKey[] = [
  's1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13'
];

const LS_KEY = 'pantbc_status';

@Injectable({ providedIn: 'root' })
export class FichaStatusService {
  private initial(): StatusMap {
    const base: StatusMap = {} as any;
    SECCIONES.forEach(k => base[k] = { completada: false, validada: false });
    // intenta restaurar desde localStorage
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return { ...base, ...JSON.parse(raw) };
    } catch (_) {}
    return base;
  }

  private subject = new BehaviorSubject<StatusMap>(this.initial());
  seccionesStatus$ = this.subject.asObservable();

  getSnapshot(): StatusMap { return this.subject.value; }

  private persist(next: StatusMap) {
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  }

  setStatus(key: SeccionKey, patch: Partial<SeccionState>) {
    const cur = this.getSnapshot();
    const next: StatusMap = { ...cur, [key]: { ...cur[key], ...patch } };
    this.subject.next(next);
    this.persist(next);
  }

  setCompletada(key: SeccionKey, v: boolean) {
    this.setStatus(key, { completada: v });
  }

  setValidada(key: SeccionKey, v: boolean) {
    this.setStatus(key, { validada: v });
  }

  /** Publica estados masivos provenientes del backend (dto) */
  setBulk(completadas: Record<SeccionKey, boolean>, validadas: Record<SeccionKey, boolean>) {
    const next: StatusMap = { ...this.getSnapshot() };
    (Object.keys(next) as SeccionKey[]).forEach(k => {
      next[k] = { completada: !!completadas[k], validada: !!validadas[k] };
    });
    this.subject.next(next);
    this.persist(next);
  }

  /** Borra todo (si alguna vez lo necesitas) */
  reset() {
    const base = this.initial();
    this.subject.next(base);
    this.persist(base);
  }
}
