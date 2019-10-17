import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosSistemaComponent } from './permisos-sistema.component';

describe('PermisosSistemaComponent', () => {
  let component: PermisosSistemaComponent;
  let fixture: ComponentFixture<PermisosSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
