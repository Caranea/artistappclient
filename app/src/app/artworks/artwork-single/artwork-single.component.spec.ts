import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkSingleComponent } from './artwork-single.component';

describe('ArtworkSingleComponent', () => {
  let component: ArtworkSingleComponent;
  let fixture: ComponentFixture<ArtworkSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworkSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
