import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha13Component } from './seccion-ficha13.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha13Component;
  let fixture: ComponentFixture<SeccionFicha13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha13Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
