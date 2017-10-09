import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { ProfileModel } from '../../components/profile-model';

@Injectable()
export class DataServiceProvider {

  public API_FEED: string = 'api/feed';
  public API_PROFILE: string = 'api/profile';
  public API_TEAM: string = 'api/team';
  public API_PROJECT: string = 'api/project';
  public API_CONNECTION: string = 'api/connection';
  public API_NOTIFICATION: string = 'api/notification';

  public profile: ProfileModel = null;
  

  constructor(private http: HttpClient) { }

  /**
   * TEAMS
   */
  public getTeamList(): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_TEAM)
      .subscribe( response => {
        resolve( response );
      }, err => {
        console.log(err);
      });
    });
  }

  /**
   * PROJECTS
   */
  public getProjectList(): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_PROJECT)
      .subscribe( response => {
        resolve( response );
      }, err => {
        console.log(err);
      });
    });
  }

  public getProjects(): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_PROJECT)
      .subscribe( response => {
        resolve( response );
      }, err => {
        console.log(err);
      });
    });
  }

  /**
   * PROFILES
   */
  public getProfileList(): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_PROFILE)
      .subscribe( response => {
        resolve( response );
      }, err => {
        console.log(err);
      });
    });
  }

  public getProfiles(ids: number[]): Promise<Object> {
    // TODO
    return null;
  }

  public getProfile(id: number): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_PROFILE)
      .subscribe( response => {       
        let profiles = response['data'];
        let profile = null;
        profiles.forEach(p => {
          if(p.id == id){
            profile = p;
          }
        });
        resolve(profile);
      }, err => {
        console.log(err);
      });
    });
  }

  public getProfileByEmail(email: string): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_PROFILE)
      .subscribe( response => {       
        let profiles = response['data'];
        let profile = null;      
        profiles.forEach(p => {       
          if(p.email == email){
            profile = p;
          }
        });
        // TODO handle profile==null
        resolve(profile);
      }, err => {
        console.log(err);
      });
    });
  }

  /**
   * CONNECTIONS
   */
  public getConnections(): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_CONNECTION)
      .subscribe( response => {
        resolve( response );
      }, err => {
        console.log(err);
      });
    });
  }

  /**
   * NOTIFICATIONS
   */
  public getNotificationList(): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_NOTIFICATION)
      .subscribe( response => {
        resolve( response );
      }, err => {
        console.log(err);
      });
    });
  }

  /**
   * FEED
   */
  public getFeedList(): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_FEED)
      .subscribe( response => {
        resolve( response );
      }, err => {
        console.log(err);
      });
    });
  }

}
