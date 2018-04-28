import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import { Bug } from '../models/bug';

@Injectable()
export class HttpService {
  private _URL = 'localhost:3001';

  constructor( private _httpClient: HttpClient) { }

  getBugs(): Observable<Bug[]> {
    return this._httpClient.get<Bug[]>(this._url);
  }

}
