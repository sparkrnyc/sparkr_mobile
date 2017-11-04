import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { MemberModel } from '../../components/member-model';
import { TeamModel } from '../../components/team-model';

@Injectable()
export class DataServiceProvider {

  /**
   * curl --request GET \
  --url 'https://sparkrapi.mybluemix.net/api/Members?filter=REPLACE_THIS_VALUE' \
  --header 'accept: application/json' \
  --header 'x-ibm-client-id: default'
   */
  private APIKEY = '05359034-9545-4dc9-975c-77cd87097aab';

  public API_BASE_URL = 'https://sparkrapi.mybluemix.net/api';
  public API_MEMBER: string = this.API_BASE_URL+'/Members';
  public API_MEMBER_LOGIN: string = this.API_BASE_URL+'/Members/login';
  public API_TEAM: string = this.API_BASE_URL+'/Teams';

  private access_token: string = null;
  public member: MemberModel = null;

  constructor(private http: HttpClient) { }

  /**
   * ADMIN
   */
  public getAccessToken(): string {
    return this.access_token;
  }

  public clearAccessToken() {
    this.access_token = null;
  }

  /**
   * TEAMS
   */
  public getTeams(): Promise<TeamModel[]> {
    return new Promise((resolve,reject) => {
      this.http.get(this.API_TEAM)
      .subscribe( (response: Array<any>) => {
        console.log("getTeams()", response);
        var teams = [];
        response.forEach(t => {
          var team = new TeamModel(
            t['id'],
            t['name'],
            t['description'],
            t['members'],
            t['invitations'],
            t['teamOwnerId']
          );
          teams.push(team);
        });
        resolve( teams);
      }, err => {
        console.log(err);
        reject(err);
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
              t['invitations'],
              t['teamOwnerId']
            );
          }
        });
        resolve(team);
      }, err => {
        console.log(err);
      });
    });
  }

  public getTeamByMemberId(id: string): Promise<TeamModel> {
    console.log("memberid:",id);

    return new Promise(resolve => {

      var qry = this.API_TEAM+'?';
      qry += 'filter[where][members][inq]='+id;
      console.log("getTeamByMemberId.qry: ", qry);
      this.http.get(qry)
      .subscribe( response => {
        console.log("teamByMemberId:", response);
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
                t['invitations'],
                t['teamOwnerId']
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
   * MEMBERS
   */

  public createMember(member: MemberModel): Promise<MemberModel> {
    return new Promise(resolve => {
      var role = member.role.toLowerCase();
      console.log("role:",role);
      var body = JSON.stringify({
        "loginType": 'loopback',
        "college": member.college,
        "major": member.major,
        "role": member.role,
        "linkedin": member.linkedin,
        "github": member.github,
        "thumbnail": 'assets/imgs/roles/'+role+'.png',
        "username": member.username,
        "name": member.name,
        "email": member.email,
        "emailVerified": member.emailVerified,
        "password": member.password
      });

      var headers = {
        headers: new HttpHeaders()
          .set('accept', 'application/json')
          .set('content-type', 'application/json')
          .set('x-ibm-client-id', this.APIKEY)
      };

      this.http.post(this.API_MEMBER, body, headers)
      .subscribe( m => {
        var member = new MemberModel(
          m['id'],
          m['loginType'],
          m['name'],
          m['username'],
          m['password'],
          m['email'],
          m['emailVerified'],
          m['thumbnail'],
          m['linkedin'],
          m['github'],
          m['college'],
          m['major'],
          m['bio'],
          m['role'],
          m['realm']
        );
        resolve(member);

      }, err => {
        console.log(err);
      });
      console.log("6. ");
    });
  }

  public updateMember(member: MemberModel): Promise<MemberModel> {
    
    console.log("updateMember:", member);

    return new Promise(resolve => {
      
      var body = JSON.stringify({
        "loginType": 'loopback',
        "college": member.college,
        "major": member.major,
        "role": member.role,
        "linkedin": member.linkedin,
        "github": member.github,
        "thumbnail": member.thumbnail,
        "username": member.username,
        "name": member.name,
        "email": member.email,
        "emailVerified": member.emailVerified,
        "password": member.password
      });

      var headers = {
        headers: new HttpHeaders()
          .set('accept', 'application/json')
          .set('content-type', 'application/json')
          .set('x-ibm-client-id', this.APIKEY)
      };

      var url = this.API_MEMBER+"/"+ member.id+"?access_token="+this.access_token;

      this.http.put(url, body, headers)
      .subscribe( m => {
        console.log("updateMember.m:", m);
        var member = new MemberModel(
          m['id'],
          m['loginType'],
          m['name'],
          m['username'],
          m['password'],
          m['email'],
          m['emailVerified'],
          m['thumbnail'],
          m['linkedin'],
          m['github'],
          m['college'],
          m['major'],
          m['bio'],
          m['role'],
          m['realm']
        );
        resolve(member);

      }, err => {
        console.log(err);
      });
    });
  }


  public login(username: string, password: string): Promise<any> {
    
    return new Promise((resolve,reject) => {

      var body = JSON.stringify({
        "username": username,
        "password": password
      });

      var headers = {
        headers: new HttpHeaders()
          .set('accept', 'application/json')
          .set('content-type', 'application/json')
          .set('x-ibm-client-id', this.APIKEY)
      };
      
      this.http.post(this.API_MEMBER_LOGIN, body, headers)
      .subscribe( login => {
        console.log("dataservice.login:", login);
        this.access_token = login['id'];
        this.getMemberById(login['userId'])
        .then( m => {
          let member = new MemberModel(
            m['id'],
            m['loginType'],
            m['name'],
            m['username'],
            m['password'],
            m['email'],
            m['emailVerified'],
            m['thumbnail'],
            m['linkedin'],
            m['github'],
            m['college'],
            m['major'],
            m['bio'],
            m['role'],
            m['realm']
          );
          console.log("loggedin member:", member);
          resolve(member);
        }, (err) => {
          console.log("Login error:", err);
          reject(err);
        });

      }, err => {
        console.log(err);
        reject(err);
      });

    });
  }

  public getMembers(): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(this.API_MEMBER)
      .subscribe( (response: Array<any>) => {
        console.log("getMembers()", response);
        var members = [];
        response.forEach(m => {
          var member = new MemberModel(
            m['id'],
            m['loginType'],
            m['name'],
            m['username'],
            m['password'],
            m['email'],
            m['emailVerified'],
            m['thumbnail'],
            m['linkedin'],
            m['github'],
            m['college'],
            m['major'],
            m['bio'],
            m['role'],
            m['realm']
          );
          members.push(member);
        });
        resolve( members);
      }, err => {
        console.log(err);
      });
    });
  }

  public getMemberById(id: number): Promise<MemberModel> {
    return new Promise(resolve => {
      this.http.get(this.API_MEMBER+'/'+id)
      .subscribe( m => {
        let member = new MemberModel(
          m['id'],
          m['loginType'],
          m['name'],
          m['username'],
          m['password'],
          m['email'],
          m['emailVerified'],
          m['thumbnail'],
          m['linkedin'],
          m['github'],
          m['college'],
          m['major'],
          m['bio'],
          m['role'],
          m['realm']
        );
        resolve(member);
      }, err => {
        console.log(err);
      });
    });
  }

  public getMemberByEmail(email: string): Promise<MemberModel> {
    return new Promise(resolve => {
      this.http.get(this.API_MEMBER+'?filter[where][email]='+email)
      .subscribe( m => {
        let member = new MemberModel(
          m['id'],
          m['loginType'],
          m['name'],
          m['username'],
          m['password'],
          m['email'],
          m['emailVerified'],
          m['thumbnail'],
          m['linkedin'],
          m['github'],
          m['college'],
          m['major'],
          m['bio'],
          m['role'],
          m['realm']
        );
        resolve(member);
      }, err => {
        console.log(err);
      });
    });
  }

  public getMembersByIds(ids: string[]): Promise<MemberModel[]> {
    return new Promise(resolve => {
      var qry = this.API_MEMBER+'?';
      ids.forEach((id)=>{
        qry += 'filter[where][id][inq]='+id+'&';
      });
      console.log("getMembersByIds.qry: ", qry);
      this.http.get(qry)
      .subscribe( response => {
        let memberArr = response['data'];
        let membersOutput: MemberModel[] = [];
        memberArr.forEach(m => {
          let member = new MemberModel(
            m['id'],
            m['loginType'],
            m['name'],
            m['username'],
            m['password'],
            m['email'],
            m['emailVerified'],
            m['thumbnail'],
            m['linkedin'],
            m['github'],
            m['college'],
            m['major'],
            m['bio'],
            m['role'],
            m['realm']
          );
          membersOutput.push(member);
        });
        resolve(membersOutput);
      }, err => {
        console.log(err);
      });
    });
  }

}
