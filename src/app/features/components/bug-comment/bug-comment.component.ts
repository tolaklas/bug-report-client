import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { Bug } from '../../models/bug';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounce} from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BugComment } from '../../models/bug-comment';

@Component({
  selector: 'codehub-bug-comment',
  templateUrl: './bug-comment.component.html',
  styleUrls: ['./bug-comment.component.scss']
})
export class BugCommentComponent implements OnInit {
  comment: BugComment;
  bugCommentForm: FormGroup;
  descriptionFormControl = new FormControl('', Validators.required);
  reporterFormControl = new FormControl('', Validators.required);
  reporters: string[] = ['QA', 'PO', 'DEV'];
  @Output() postComment: EventEmitter<BugComment> = new EventEmitter();

  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.bugCommentForm = new FormGroup({
      description: this.descriptionFormControl,
      reporter: this.reporterFormControl,
    });
  }

  formSubmit() {
    this.comment = this.bugCommentForm.value;
    this.bugCommentForm.controls.description.setValue('');
    this.bugCommentForm.controls.reporter.setValue(null);
    this.postComment.emit(this.comment);
  }
}
