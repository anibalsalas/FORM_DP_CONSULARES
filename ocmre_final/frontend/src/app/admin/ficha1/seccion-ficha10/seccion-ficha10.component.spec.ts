import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha10Component } from './seccion-ficha10.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha10Component;
  let fixture: ComponentFixture<SeccionFicha10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha10Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
