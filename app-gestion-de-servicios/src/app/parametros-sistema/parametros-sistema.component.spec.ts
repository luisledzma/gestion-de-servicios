import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosSistemaComponent } from './parametros-sistema.component';

describe('ParametrosSistemaComponent', () => {
  let component: ParametrosSistemaComponent;
  let fixture: ComponentFixture<ParametrosSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
