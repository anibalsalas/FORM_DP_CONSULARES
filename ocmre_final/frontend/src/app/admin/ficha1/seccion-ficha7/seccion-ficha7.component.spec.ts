import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha7Component } from './seccion-ficha7.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha7Component;
  let fixture: ComponentFixture<SeccionFicha7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
