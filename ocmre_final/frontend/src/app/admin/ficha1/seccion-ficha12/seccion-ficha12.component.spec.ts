import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFicha12Component } from './seccion-ficha12.component';

describe('SeccionFicha3Component', () => {
  let component: SeccionFicha12Component;
  let fixture: ComponentFixture<SeccionFicha12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionFicha12Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionFicha12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
