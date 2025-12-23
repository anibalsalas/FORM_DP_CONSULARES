import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha5Component } from './seccion-ficha5.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha5Component;
  let fixture: ComponentFixture<SeccionFicha5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
