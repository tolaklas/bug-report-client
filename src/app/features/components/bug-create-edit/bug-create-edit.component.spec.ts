import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugCreateEditComponent } from './bug-create-edit.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpService } from '../../services/http.service';
import { MockHttpService } from '../../services/mock.http.service';
import { HttpClient } from '@angular/common/http';
import { FeaturesModule } from '../../features.module';
import { BugCommentComponent } from '../bug-comment/bug-comment.component';
import { BugCommentTableComponent } from '../bug-comment-table/bug-comment-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';

fdescribe('BugCreateEditComponent', () => {
  let component: BugCreateEditComponent;
  let fixture: ComponentFixture<BugCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule.withRoutes([]), CoreModule],
      declarations: [ BugCreateEditComponent, BugCommentComponent, BugCommentTableComponent ],
      providers: [
        {provide: HttpService, useClass: MockHttpService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    if (component.bugForm.pristine) {
      expect(component.bugForm.invalid).toBeTruthy();
    }
    component.bugForm.controls.title.setValue('Test');
    component.bugForm.controls.description.setValue('Test');
    component.bugForm.controls.priority.setValue('1');
    component.bugForm.controls.status.setValue('Done');
    expect(component.bugForm.valid).toBeTruthy();

    component.bugForm.controls.reporter.setValue('QA');
    expect(component.bugForm.valid).toBeTruthy();

    component.bugForm.controls.status.setValue('Ready for test');
    expect(component.bugForm.valid).toBeTruthy();

  });
});
