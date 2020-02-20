import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobClienteComponent } from './aprob-cliente.component';

describe('AprobClienteComponent', () => {
  let component: AprobClienteComponent;
  let fixture: ComponentFixture<AprobClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
