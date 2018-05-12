import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug } from '../../models/bug';
import { Order } from '../../models/order';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'codehub-bug-table',
  templateUrl: './bug-table.component.html',
  styleUrls: ['./bug-table.component.scss']
})
export class BugTableComponent implements OnInit, OnDestroy {

  bugs: Bug[];
  sub: any;
  sortItem: string;
  order: Order;

  headers: any[] = [
    {name: 'Title', value: 'title'},
    {name: 'Description', value: 'description'},
    {name: 'Priority', value: 'priority'},
    {name: 'Reporter', value: 'reporter'},
    {name: 'Status', value: 'status'},
    {name: 'Date Created', value: 'createdAt'},
    {name: 'Date Updated', value: 'updatedAt'},
  ];

  constructor(
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this.sortItem = this.headers[0].value;
    this.order = Order.asc;
    this.get();
  }

  sort(sortBy: string) {
    this.order = this.sortItem === sortBy ? this.toggleOrder() : Order.asc;
    this.sortItem = sortBy;
    this.get();
  }

  toggleOrder(): Order {
    return this.order === Order.asc ? Order.desc : Order.asc;
  }

  get() {
    this.sub = this._httpService.getBugs(this.sortItem, this.order).subscribe(
      data => this.bugs = data,
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}
