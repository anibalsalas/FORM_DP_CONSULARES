import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha1MonitoreoComponent } from './monitoreo-ficha1.component';

describe('Ficha1MonitoreoComponent', () => {
  let component: Ficha1MonitoreoComponent;
  let fixture: ComponentFixture<Ficha1MonitoreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ficha1MonitoreoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ficha1MonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
