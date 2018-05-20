import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug } from '../../models/bug';
import { Order } from '../../models/order';
import { HttpService } from '../../services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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
  currentPage = 0;
  pageSize = 2;
  hasNextPage = new Subject();
  hasNextPage$ = this.hasNextPage.asObservable();


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
    this.sub = this._httpService.getBugs(this.sortItem, this.order, this.currentPage, this.pageSize).subscribe(
      data => {
        this.bugs = data;
        this.hasMoreData();
      },
      err => console.log(err)
    );
  }

  hasMoreData() {
    const newPageSize = (this.currentPage + 1) * this.pageSize + 1;
    this._httpService.getBugs(this.sortItem, this.order, this.currentPage, newPageSize).subscribe(
      data => {
        if (data && data.length) {
          this.hasNextPage.next(true);
        } else {
          this.hasNextPage.next(false);
        }
      },
      err => console.log(err)
    );
  }

  leftPage() {
    this.togglePage(-1);
  }

  rightPage() {
    this.togglePage(1);
  }

  private togglePage(step: number) {
    this.currentPage += step;
    this.get();
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}
