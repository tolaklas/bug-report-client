import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Bug } from '../models/bug';
import { Order } from '../models/order';

@Injectable()
export class HttpService {
  private _URL = 'http://localhost:3001';

  constructor( private _httpClient: HttpClient) { }

  getBugs(sortItem?: string,
          sortType?: Order,
          currentPage?: number,
          pageSize?: number,
          searchParams?: any
        ) {
    const params = {};

    if (sortItem && sortType) {
      params['sort'] = `${sortItem},${sortType}`;
    }

    if ((currentPage || currentPage === 0) && pageSize) {
      params['page'] = currentPage;
      params['size'] = pageSize;
    }

    if (searchParams) {
      Object.keys(searchParams).forEach(key => {
        params[key] = searchParams[key];
      });
    }
    return this._httpClient.get<Bug[]>(this._URL + '/bugs', {params: params, observe: 'response'})
    .map(
      data => {
        return {res: data.body, total: data.headers.get('totalPages')};
      }
    );
  }

  getBug(id: string): Observable<Bug> {
    return this._httpClient.get<Bug>(this._URL + `/bugs/${id}`);
  }

  postBug(bug: Bug): Observable<Bug> {
    return this._httpClient.post<Bug>(this._URL + '/bugs', bug);
  }

  updateBug(bug: Bug, id: string): Observable<Bug> {
    return this._httpClient.put<Bug>(this._URL + `/bugs/${id}`, bug);
  }

}
