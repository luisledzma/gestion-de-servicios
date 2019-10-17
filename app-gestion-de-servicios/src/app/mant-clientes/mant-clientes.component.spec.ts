import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantClientesComponent } from './mant-clientes.component';

describe('MantClientesComponent', () => {
  let component: MantClientesComponent;
  let fixture: ComponentFixture<MantClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
