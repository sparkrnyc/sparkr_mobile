import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataServiceProvider {

  public object1ListApiHost: string = './assets/data/object1list.json';
  public object2ListApiHost: string = './assets/data/object2list.json';
  public user1ListApiHost: string = './assets/data/user1list.json';
  public user2ListApiHost: string = './assets/data/user2list.json';
  public notificationListApiHost: string = './assets/data/notificationlist.json';

  constructor(private http: Http) { }

  public getUser1List(): Promise<Object> {
    return this.http.get(this.user1ListApiHost)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getUser2List(): Promise<Object> {
    return this.http.get(this.user2ListApiHost)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getObject1List(): Promise<Object> {
    return this.http.get(this.object1ListApiHost)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getObject2List(): Promise<Object> {
    return this.http.get(this.object2ListApiHost)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getNotificationList(): Promise<Object> {
    return this.http.get(this.notificationListApiHost)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
