import { Component, OnInit } from '@angular/core';
import { Bug } from '../../models/bug';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounce} from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BugComment } from '../../models/bug-comment';

@Component({
  selector: 'codehub-bug-create-edit',
  templateUrl: './bug-create-edit.component.html',
  styleUrls: ['./bug-create-edit.component.scss']
})
export class BugCreateEditComponent implements OnInit {
  id: string;
  bug: Bug;
  priorities: number[] = [1, 2, 3];
  reporters: string[] = ['QA', 'PO', 'DEV'];
  statusTypes: string[] = ['Ready for test', 'Done', 'Rejected'];
  bugForm: FormGroup;

  titleFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  titleFormControlErrorMessage = '';
  titleFormControlValidationMessages = {
    required : 'The first name is required',
    minlength: 'The minlength is 3 characters',
    maxlength: 'The maxlength is 25 characters'
  };

  descriptionFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  descriptionFormControlErrorMessage = '';
  descriptionFormControlValidationMessages = {
    required : 'The first name is required',
    minlength: 'The minlength is 3 characters',
  };

  priorityFormControl = new FormControl('', [Validators.required]);
  priorityFormControlErrorMessage = '';
  priorityFormControlValidationMessages = {
    required : 'The first name is required'
  };
  reporterFormControl = new FormControl('');
  reporterFormControlErrorMessage = '';
  statusFormControl = new FormControl('');
  statusFormControlErrorMessage = '';
  statusFormControlValidationMessages = {
    required : 'Status is required',
  };


  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  initialize(id: string) {
    this.id = id;
    if (id) {
      this._httpService.getBug(id).subscribe(b => {
        this.bug = b;
        if (! b.comments) {
          this.bug.comments = [];
        }
        this.bugForm.controls.title.setValue(this.bug.title);
        this.bugForm.controls.description.setValue(this.bug.description);
        this.bugForm.controls.priority.setValue(this.bug.priority);
        this.bugForm.controls.reporter.setValue(this.bug.reporter);
        this.bugForm.controls.status.setValue(this.bug.status);

      }, err => console.log(err));

    } else {
      this.bug = {
        title: '',
        description: '',
        priority: null,
        reporter: null,
        status: null
      };
    }
  }

  ngOnInit() {
    this.bugForm = new FormGroup({
      title: this.titleFormControl,
      description: this.descriptionFormControl,
      priority: this.priorityFormControl,
      reporter: this.reporterFormControl,
      status: this.statusFormControl
    });

    this.initialize(this._route.snapshot.params.id);

    this.titleFormControl.valueChanges.subscribe(
      value => {
        this.titleFormControlErrorMessage = '';
        if ((this.titleFormControl.touched || this.titleFormControl.dirty) && this.titleFormControl.errors) {
          this.titleFormControlErrorMessage = Object.keys(this.titleFormControlValidationMessages)
            .map(c => this.titleFormControlValidationMessages[c]).join(' ');
        }
      }
    );

    this.descriptionFormControl.valueChanges.subscribe(
      value => {
        this.descriptionFormControlErrorMessage = '';
        if ((this.descriptionFormControl.touched || this.descriptionFormControl.dirty) && this.descriptionFormControl.errors) {
          this.descriptionFormControlErrorMessage = Object.keys(this.descriptionFormControlValidationMessages)
            .map(c => this.descriptionFormControlValidationMessages[c]).join(' ');
        }
      }
    );

    this.priorityFormControl.valueChanges.subscribe(
      value => {
        this.priorityFormControlErrorMessage = '';
        if ((this.priorityFormControl.touched || this.priorityFormControl.dirty) && this.priorityFormControl.errors) {
          this.priorityFormControlErrorMessage = Object.keys(this.priorityFormControlValidationMessages)
            .map(c => this.priorityFormControlValidationMessages[c]).join(' ');
        }
      }
    );

    this.reporterFormControl.valueChanges.subscribe(
      value => {
        this.statusFormControlErrorMessage = '';
        if ((this.reporterFormControl.touched || this.reporterFormControl.dirty) && this.reporterFormControl.value === 'QA') {
          this.statusFormControl.setValidators(Validators.required);
        } else if ((this.reporterFormControl.touched || this.reporterFormControl.dirty) && this.reporterFormControl.value !== 'QA') {
          this.statusFormControl.clearValidators();
        }
        this.statusFormControl.updateValueAndValidity();
      }
    );

    this.statusFormControl.valueChanges.subscribe(
      value => {
        this.statusFormControlErrorMessage = '';
        if ((this.statusFormControl.touched || this.statusFormControl.dirty) && this.statusFormControl.errors) {
          this.statusFormControlErrorMessage = Object.keys(this.statusFormControlValidationMessages)
            .map(c => this.statusFormControlValidationMessages[c]).join(' ');
        }
      }
    );
  }

  formSubmit() {
    this.bug = this.bugForm.value;
    this.bugForm.markAsPristine();
    if (this.id) {
      this.updateBug(this.bug);
    } else {
      this._httpService.postBug(this.bug).pipe(debounce(() => timer(5000))).subscribe(
        data => {
          this._router.navigate(['']);
        },
        err => console.log(err)
      );
    }
  }

  canDeactivate(): boolean {
    return !this.bugForm.dirty;
  }

  postComment(comment: BugComment) {
    this.bug.comments.push(comment);
    this.updateBug(this.bug, false);
  }

  private updateBug(bug: Bug, navigate: boolean = true) {
    this._httpService.updateBug(bug, this.id).pipe(debounce(() => timer(5000))).subscribe(
      data => {
        if (navigate) {this._router.navigate(['']); }
      },
      err => console.log(err)
    );
  }
}
