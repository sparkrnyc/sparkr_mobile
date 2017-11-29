import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { MemberModel } from '../../components/member-model';
import { TeamModel } from '../../components/team-model';
import { RequestModel } from '../../components/request-model';

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
  public API_BASE_URL1 = 'http://localhost:3000/api';
  public API_MEMBER: string = this.API_BASE_URL+'/Members';
  public API_MEMBER_LOGIN: string = this.API_BASE_URL+'/Members/login';
  public API_TEAM: string = this.API_BASE_URL+'/Teams';
  public API_REQUEST: string = this.API_BASE_URL+'/Requests';

  private access_token: string = null;
  public member: MemberModel = null;

  constructor(private http: HttpClient
              ) { }

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


  public createTeam(team: TeamModel): Promise<TeamModel> {
    return new Promise(resolve => {

      if(team.invitations==null){
        team.invitations = [];
      }
      var body = JSON.stringify({
        "name": team.name,
        "description": team.description,
        "members": [team.members.join()],
        "invitations": team.invitations,
        "teamOwnerId": team.teamOwnerId
      });
      console.log("createTeam.body",body);

      var headers = {
        headers: new HttpHeaders()
          .set('accept', 'application/json')
          .set('content-type', 'application/json')
          .set('x-ibm-client-id', this.APIKEY)
      };

      var url = this.API_TEAM+"?access_token="+this.access_token;

      this.http.post(url, body, headers)
      .subscribe( t => {
        var team = new TeamModel(
          t['id'],
          t['name'],
          t['description'],
          t['members'],
          t['invitations'],
          t['teamOwnerId']
        );
        resolve(team);

      }, err => {
        console.log(err);
      });
    });
  }

  public updateTeam(team: TeamModel): Promise<TeamModel> {
    console.log("updateTeam:", team);
    return new Promise(resolve => {

      var body = JSON.stringify({
        "id": team.id,
        "name": team.name,
        "description": team.description,
        "members": team.members,
        "invitations": team.invitations,
        "teamOwnerId": team.teamOwnerId
      });

      var headers = {
        headers: new HttpHeaders()
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          //.set('x-ibm-client-id', this.APIKEY)
      };

      var url = this.API_TEAM+"/"+ team.id+"?access_token="+this.access_token;
      console.log("updateTeamURL: ", url);

      this.http.put(url, body, headers)
      .subscribe( t => {
        console.log("updatedTeam.t:", t);
        var team = new TeamModel(
          t['id'],
          t['name'],
          t['description'],
          t['members'],
          t['invitations'],
          t['teamOwnerId']
        );
        resolve(team);

      }, err => {
        console.log(err);
      });
    });
  }

  public getTeamByMemberId(memberId: string): Promise<TeamModel> {
    return new Promise((resolve,reject) => {
      var teamFound = null;

      var headers = {
        headers: new HttpHeaders()
          .set('accept', 'application/json')
          .set('content-type', 'application/json')
          .set('x-ibm-client-id', this.APIKEY)
      };

      this.http.get(this.API_TEAM, headers)
      .subscribe( (teams: Array<any>) => {
        console.log("getTeams()", teams);

        teams.forEach(t => {
          var team = new TeamModel(
            t.id,
            t.name,
            t.description,
            t.members,
            t.invitations,
            t.teamOwnerId
          );
          team.members.forEach((mid)=>{
            if(mid==memberId){
              teamFound = team;
            }
          })
        });
        
        resolve( teamFound);
      }, err => {
        console.log(err);
        reject(err);
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

  public getMemberById(id: string): Promise<MemberModel> {
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
      //curl -g -X GET --header 'Accept: application/json' 
      // 'https://sparkrapi.mybluemix.net/api/Members?
      //   filter[where][id][inq]=59ff37d21404320044bed69b&
      //   filter[where][id][inq]=59fe71ad1404320044bed698&
      //   access_token=Y10Fsv4ehFhjeGUO6XM35xyvJo9KUsDjfYHv7CKENZxjRSNFOWIeWRcFFUCyCvdK'
      var qry = this.API_MEMBER+'?';
      ids.forEach((id)=>{
        qry += 'filter[where][id][inq]='+id+'&';
      });
      qry+="access_token="+this.access_token;
      
      console.log("getMembersByIds.qry: ", qry);
      this.http.get(qry)
      .subscribe( (response: Array<any>) => {
        var membersOutput: MemberModel[] = [];
        response.forEach(m => {
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


  /**
   * REQUESTS
   */
   public createRequest(request: RequestModel): Promise<RequestModel> {
    return new Promise(resolve => {

      var body = JSON.stringify({
        "member": request.member,
        "team": request.team,
        "requestType": request.requestType,
        "requestStatus": request.requestStatus,
        "dateCreated": request.dateCreated
      });

      console.log("createRequest.body",body);

      var headers = {
        headers: new HttpHeaders()
          .set('accept', 'application/json')
          .set('content-type', 'application/json')
          .set('x-ibm-client-id', this.APIKEY)
      };

      var url = this.API_REQUEST+"?access_token="+this.access_token;

      this.http.post(url, body, headers)
      .subscribe( r => {
        var request = new RequestModel(
          r['id'],
          r['member'],
          r['team'],
          r['requestType'],
          r['requestStatus'],
          r['dateCreated']
        );
        resolve(request);

      }, err => {
        console.log(err);
      });
    });
  }

  public updateRequest(request: RequestModel): Promise<RequestModel> {
    return new Promise(resolve => {

      var body = JSON.stringify({
        "id": request.id,
        "member": request.member,
        "team": request.team,
        "requestType": request.requestType,
        "requestStatus": request.requestStatus,
        "dateCreated": request.dateCreated
      });

      console.log("updateRequest.body", body);

      var headers = {
        headers: new HttpHeaders()
          .set('accept', 'application/json')
          .set('content-type', 'application/json')
          //.set('x-ibm-client-id', this.APIKEY)
      };

      var url = this.API_REQUEST+"/"+request.id+"?access_token="+this.access_token;

      this.http.put(url, body, headers)
      .subscribe( r => {
        var request = new RequestModel(
          r['id'],
          r['member'],
          r['team'],
          r['requestType'],
          r['requestStatus'],
          r['dateCreated']
        );
        resolve(request);

      }, err => {
        console.log(err);
      });
    });
  }

  public getRequests(): Promise<RequestModel[]> {
    return new Promise((resolve,reject) => {
      this.http.get(this.API_REQUEST)
      .subscribe( (response: Array<any>) => {
        console.log("getRequests()", response);
        var requests = [];
        response.forEach(r => {
          var request = new RequestModel(
            r['id'],
            r['member'],
            r['team'],
            r['requestType'],
            r['requestStatus'],
            r['dateCreated']
            );
          requests.push(request);
        });
        resolve( requests);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  public getRequestsForTeam(teamId: string): Promise<RequestModel[]> {
    return new Promise((resolve,reject) => {
      console.log("getRequestsForTeam("+teamId+")");
      var url = this.API_REQUEST+"?filter[where][team.id]="+teamId;

      this.http.get(url)
      .subscribe( (response: Array<any>) => {
        var requests = [];
        response.forEach(r => {
          var request = new RequestModel(
            r['id'],
            r['member'],
            r['team'],
            r['requestType'],
            r['requestStatus'],
            r['dateCreated']
          );
          requests.push(request);
        });
        resolve( requests);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  public getRequestsByMemberId(memberId: string): Promise<RequestModel[]>{
    return new Promise((resolve,reject) => {

      var url = this.API_REQUEST+"?filter[where][member.id]="+memberId;

      this.http.get(url)
      .subscribe( (response: Array<any>) => {
        console.log("getRequests()", response);
        var requests = [];
        response.forEach(r => {
          var request = new RequestModel(
            r['id'],
            r['member'],
            r['team'],
            r['requestType'],
            r['requestStatus'],
            r['dateCreated']
          );
          requests.push(request);
        });
        resolve( requests);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }


}
