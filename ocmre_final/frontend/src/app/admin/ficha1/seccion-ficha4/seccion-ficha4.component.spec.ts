import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha4Component } from './seccion-ficha4.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha4Component;
  let fixture: ComponentFixture<SeccionFicha4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
