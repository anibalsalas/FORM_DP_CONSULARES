import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha6Component } from './seccion-ficha6.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha6Component;
  let fixture: ComponentFixture<SeccionFicha6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
