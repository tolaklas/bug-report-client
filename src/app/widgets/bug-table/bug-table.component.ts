import { Component, OnInit } from '@angular/core';
import { Bug } from '../../models/bug';

@Component({
  selector: 'codehub-bug-table',
  templateUrl: './bug-table.component.html',
  styleUrls: ['./bug-table.component.scss']
})
export class BugTableComponent implements OnInit {

  bugs: Bug[];

  constructor() { }

  ngOnInit() {
  }

}
