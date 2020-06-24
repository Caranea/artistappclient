import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPortfolioComponent } from './general-portfolio.component';

describe('GeneralPortfolioComponent', () => {
  let component: GeneralPortfolioComponent;
  let fixture: ComponentFixture<GeneralPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
