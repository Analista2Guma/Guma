import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzAzulComponent } from './cruz-azul.component';

describe('CruzAzulComponent', () => {
  let component: CruzAzulComponent;
  let fixture: ComponentFixture<CruzAzulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CruzAzulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzAzulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
