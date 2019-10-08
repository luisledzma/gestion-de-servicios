import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantRolComponent } from './mant-rol.component';

describe('MantRolComponent', () => {
  let component: MantRolComponent;
  let fixture: ComponentFixture<MantRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
