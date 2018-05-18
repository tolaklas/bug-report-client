import { Component, OnInit } from '@angular/core';
import { Bug } from '../../models/bug';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounce} from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'codehub-bug-comment',
  templateUrl: './bug-comment.component.html',
  styleUrls: ['./bug-comment.component.scss']
})
export class BugCommentComponent implements OnInit {
  comment: any;
  bugCommentForm: FormGroup;
  show = false;
  freeTextFormControl = new FormControl('');
  reporterNameFormControl = new FormControl('');

  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {

    if (this._route.snapshot.params.id) {this.show = true; }

    this.bugCommentForm = new FormGroup({
      freeText: this.freeTextFormControl,
      reporterName: this.reporterNameFormControl,
    });
  }

  formSubmit() {
    this.comment = this.bugCommentForm.value;
    console.log(this.comment);
    // this._httpService.postBug(this.bug).pipe(debounce(() => timer(5000))).subscribe(
    //   data => {
    //     console.log(data);
    //     this._router.navigate(['']);
    //   },
    //   err => console.log(err)
    // );
  }
}
