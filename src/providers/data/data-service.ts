import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataServiceProvider {

  public feedListApiHost: string = './assets/data/feedlist.json';
  public object2ListApiHost: string = './assets/data/object2list.json';
  public teamListApiHost: string = './assets/data/teamlist.json';
  public projectListApiHost: string = './assets/data/projectlist.json';
  public notificationListApiHost: string = './assets/data/notificationlist.json';

  constructor(private http: Http) { }

  public getTeamList(): Promise<Object> {
    return this.http.get(this.teamListApiHost)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getProjectList(): Promise<Object> {
    return this.http.get(this.projectListApiHost)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getFeedList(): Promise<Object> {
    return this.http.get(this.feedListApiHost)
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
