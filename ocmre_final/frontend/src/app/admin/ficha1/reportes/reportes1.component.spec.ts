import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSeccion1Component } from './reportes1.component';

describe('ReportesComponent', () => {
  let component: ReporteSeccion1Component;
  let fixture: ComponentFixture<ReporteSeccion1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteSeccion1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteSeccion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
