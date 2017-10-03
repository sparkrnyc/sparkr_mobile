import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ProfileModel } from '../../components/profile-model';

@Injectable()
export class DataServiceProvider {

  public feedListApiHost: string = './assets/data/feedlist.json';
  public profileListApiHost: string = './assets/data/profilelist.json';
  public teamListApiHost: string = './assets/data/teamlist.json';
  public projectListApiHost: string = './assets/data/projectlist.json';
  public notificationListApiHost: string = './assets/data/notificationlist.json';

  public profile: ProfileModel = null;
  

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

  public getProfileList(): Promise<Object> {
    return this.http.get(this.profileListApiHost)
      .toPromise()
      .then((response) => {
        return response.json();
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getProfiles(ids: number[]): Promise<Object> {
    // TODO
    return null;
  }

  public getProfile(id: number): Promise<Object> {
    return this.http.get(this.profileListApiHost)
      .toPromise()
      .then((response) => {
        let profiles = response.json().profileList;
        let profile = null;
        console.log("profiles: ", profiles);
        profiles.forEach(p => {
          if(p.id == id){
            console.log("matched profile:", p);
            profile = p;
          }
        });
        return profile;
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
