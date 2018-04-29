import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import { Bug } from '../models/bug';
import { Order } from '../models/order';

@Injectable()
export class HttpService {
  private _URL = 'http://localhost:3001';

  constructor( private _httpClient: HttpClient) { }

  getBugs(sortItem?: string, sortType?: Order ): Observable<Bug[]> {
    const params = {};
    if (sortItem && sortType) { params['sort'] = `${sortItem},${sortType}`; }
    return this._httpClient.get<Bug[]>(this._URL + '/bugs', {params: params});
  }

}
