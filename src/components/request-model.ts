import { MemberModel } from './member-model';
import { TeamModel } from './team-model';

export class RequestModel {

    constructor(
      public id: string,
      public member: MemberModel,
      public team: TeamModel,
      public requestType: string,
      public requestStatus: string,
      public dateCreated: Date
    ){}
}