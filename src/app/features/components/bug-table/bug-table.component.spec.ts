import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugTableComponent } from './bug-table.component';

describe('BugTableComponent', () => {
  let component: BugTableComponent;
  let fixture: ComponentFixture<BugTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
