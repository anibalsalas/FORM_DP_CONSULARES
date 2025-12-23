import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha11Component } from './seccion-ficha11.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha11Component;
  let fixture: ComponentFixture<SeccionFicha11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha11Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
