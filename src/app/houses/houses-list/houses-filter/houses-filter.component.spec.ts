import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesFilterComponent } from './houses-filter.component';

describe('HousesFilterComponent', () => {
  let component: HousesFilterComponent;
  let fixture: ComponentFixture<HousesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
