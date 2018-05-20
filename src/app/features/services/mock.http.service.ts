import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Bug } from '../models/bug';
import { Order } from '../models/order';
import { HttpService } from './http.service';

export class MockHttpService {
  bug: Bug = {
    id: 'test',
    description: 'test',
    priority: 2,
    status: 'rejected',
    title: 'test',
    reporter: 'QA'
  };

  constructor() {
    // super(new HttpClient());
  }

  getBugs(sortItem?: string, sortType?: Order ): Observable<Bug[]> {
    return Observable.of([this.bug]);
  }

  getBug(id: string): Observable<Bug> {
    return Observable.of(this.bug);
  }

  postBug(bug: Bug): Observable<Bug> {
    return Observable.of(this.bug);
  }

  updateBug(bug: Bug, id: string): Observable<Bug> {
    return Observable.of(this.bug);
  }



}
