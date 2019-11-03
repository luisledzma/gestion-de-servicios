import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantEtapasProyectoComponent } from './mant-etapas-proyecto.component';

describe('MantEtapasProyectoComponent', () => {
  let component: MantEtapasProyectoComponent;
  let fixture: ComponentFixture<MantEtapasProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantEtapasProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantEtapasProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
