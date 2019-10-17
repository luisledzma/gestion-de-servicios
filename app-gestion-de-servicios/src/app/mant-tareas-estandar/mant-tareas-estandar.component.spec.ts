import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantTareasEstandarComponent } from './mant-tareas-estandar.component';

describe('MantTareasEstandarComponent', () => {
  let component: MantTareasEstandarComponent;
  let fixture: ComponentFixture<MantTareasEstandarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantTareasEstandarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantTareasEstandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
