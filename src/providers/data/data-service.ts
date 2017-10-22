import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { ProfileModel } from '../../components/profile-model';
import { TeamModel } from '../../components/team-model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataServiceProvider {

  public API_FEED: string = 'api/feed';
  public API_PROFILE: string = 'api/profile';
  public API_TEAM: string = 'api/team';
  public API_CONNECTION: string = 'api/connection';
  public API_NOTIFICATION: string = 'api/notification';

  public profile: ProfileModel = null;

  constructor(private http: HttpClient) { }

  /**
   * TEAMS
   */
  public getTeams(): Observable<Object> {
     return this.http.get(this.API_TEAM);
  }

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

  public getTeamById(id: number): Promise<TeamModel> {
    return new Promise(resolve => {
      this.http.get(this.API_TEAM)
      .subscribe( response => {
        let teams = response['data'];
        let team = null;
        teams.forEach(t => {
          if(t.id == id){
            team = new TeamModel(
              t['id'],
              t['name'],
              t['description'],
              t['members'],
              t['invitations']
            );
          }
        });
        resolve(team);
      }, err => {
        console.log(err);
      });
    });
  }

  public getTeamByProfileId(id: number): Promise<TeamModel> {
    return new Promise(resolve => {
      this.http.get(this.API_TEAM)
      .subscribe( response => {
        let teams = response['data'];
        let team = null;
        teams.forEach(t => {
          t['members'].forEach(cid=>{
            if(cid == id) {
              team = new TeamModel(
                t['id'],
                t['name'],
                t['description'],
                t['members'],
                t['invitations']
              );
            }
          });
        });
        resolve( team );
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

  public getProfileById(id: number): Promise<ProfileModel> {
    return new Promise(resolve => {
      this.http.get(this.API_PROFILE)
      .subscribe( response => {
        let profiles = response['data'];
        let profile: ProfileModel = null;
        profiles.forEach(p => {
          if(p.id == id){
            profile = new ProfileModel(
              p['id'],
              p['username'],
              p['thumbnail'],
              p['email'],
              p['linkedin'],
              p['firstname'],
              p['lastname'],
              p['city'],
              p['state'],
              p['country'],
              p['college'],
              p['degree'],
              p['company'],
              p['bio'],
              p['role']
            );
          }
        });
        resolve(profile);
      }, err => {
        console.log(err);
      });
    });
  }

  public getProfileByEmail(email: string): Promise<ProfileModel> {
    return new Promise(resolve => {
      this.http.get(this.API_PROFILE)
      .subscribe( response => {
        let profiles = response['data'];
        let profile = null;
        profiles.forEach(p => {
          if(p.email == email){
            profile = new ProfileModel(
              p['id'],
              p['username'],
              p['thumbnail'],
              p['email'],
              p['linkedin'],
              p['firstname'],
              p['lastname'],
              p['city'],
              p['state'],
              p['country'],
              p['college'],
              p['degree'],
              p['company'],
              p['bio'],
              p['role']
            );
          }
        });
        // TODO handle profile==null
        resolve(profile);
      }, err => {
        console.log(err);
      });
    });
  }

  public getProfiles(ids: number[]): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_PROFILE)
      .subscribe( response => {
        let profiles = response['data'];
        let profilesOutput = [];
        profiles.forEach(p => {
          ids.forEach(id => {
            if (p.id == id) {
              profilesOutput.push(p);
            }
          })
        });
        resolve(profilesOutput);
      }, err => {
        console.log(err);
      });
    });
  }


  public getProfilesByTeamId(id: number): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_PROFILE)
      .subscribe( response => {
        
        resolve();
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

}
