import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirArchivoComponent2 } from './subir-archivo2.component';

describe('SubirArchivoComponent', () => {
  let component: SubirArchivoComponent2;
  let fixture: ComponentFixture<SubirArchivoComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirArchivoComponent2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirArchivoComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
