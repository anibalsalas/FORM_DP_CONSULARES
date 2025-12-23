import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha2Component } from './seccion-ficha2.component';

describe('SeccionFicha2Component', () => {
  let component: SeccionFicha2Component;
  let fixture: ComponentFixture<SeccionFicha2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
