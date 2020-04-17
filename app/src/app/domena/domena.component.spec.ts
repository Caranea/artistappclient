import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomenaComponent } from './domena.component';

describe('DomenaComponent', () => {
  let component: DomenaComponent;
  let fixture: ComponentFixture<DomenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
