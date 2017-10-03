import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GlobalServiceProvider Provider');
  }

}
