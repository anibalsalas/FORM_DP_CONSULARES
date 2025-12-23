import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha3Component } from './seccion-ficha3.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha3Component;
  let fixture: ComponentFixture<SeccionFicha3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
