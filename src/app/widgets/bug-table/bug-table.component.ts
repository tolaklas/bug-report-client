import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug } from '../../models/bug';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'codehub-bug-table',
  templateUrl: './bug-table.component.html',
  styleUrls: ['./bug-table.component.scss']
})
export class BugTableComponent implements OnInit, OnDestroy {

  bugs: Bug[];
  sub: any;

  constructor(
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this.sub = this._httpService.getBugs().subscribe(
      data => this.bugs = data,
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}
