import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantFormularioComponent } from './mant-formulario.component';

describe('MantFormularioComponent', () => {
  let component: MantFormularioComponent;
  let fixture: ComponentFixture<MantFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
