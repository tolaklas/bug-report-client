import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugCommentTableComponent } from './bug-comment-table.component';

describe('BugCommentTableComponent', () => {
  let component: BugCommentTableComponent;
  let fixture: ComponentFixture<BugCommentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugCommentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugCommentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
