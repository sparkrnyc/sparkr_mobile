export class TeamModel {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public members: string[],
      public invitations: string[],
      public teamOwnerId: string
    ){}
}
