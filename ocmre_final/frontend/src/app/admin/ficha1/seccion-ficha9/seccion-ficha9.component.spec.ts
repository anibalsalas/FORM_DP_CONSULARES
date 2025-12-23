import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha9Component } from './seccion-ficha9.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha9Component;
  let fixture: ComponentFixture<SeccionFicha9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
