import { Component, OnInit, Input } from '@angular/core';
import { BugComment } from '../../models/bug-comment';

@Component({
  selector: 'codehub-bug-comment-table',
  templateUrl: './bug-comment-table.component.html',
  styleUrls: ['./bug-comment-table.component.scss']
})
export class BugCommentTableComponent implements OnInit {
  @Input() comments: BugComment[];

  constructor() { }

  ngOnInit() {
  }

}
