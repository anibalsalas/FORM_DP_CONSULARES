import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha1Component } from './seccion-ficha1.component';

describe('SeccionFicha1Component', () => {
  let component: SeccionFicha1Component;
  let fixture: ComponentFixture<SeccionFicha1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
