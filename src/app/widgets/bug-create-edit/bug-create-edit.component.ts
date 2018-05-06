import { Component, OnInit } from '@angular/core';
import { Bug } from '../../models/bug';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { debounce} from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'codehub-bug-create-edit',
  templateUrl: './bug-create-edit.component.html',
  styleUrls: ['./bug-create-edit.component.scss']
})
export class BugCreateEditComponent implements OnInit {

  bug: Bug;
  priorities: number[] = [1, 2, 3];
  reporters: string[] = ['QA', 'PO', 'DEV'];
  statusTypes: string[] = ['Ready for test', 'Done', 'Rejected'];

  constructor(
    private _httpService: HttpService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.bug = {
      title: '',
      description: '',
      priority: null,
      reporter: null,
      status: null

    };
  }

  formSubmit() {
    this._httpService.postBug(this.bug).pipe(debounce(() => timer(5000))).subscribe(
      data => {
        console.log(data);
        this._router.navigate(['']);
      },
      err => console.log(err)
    );
  }
}
