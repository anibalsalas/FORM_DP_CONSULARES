import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha8Component } from './seccion-ficha8.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha8Component;
  let fixture: ComponentFixture<SeccionFicha8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
