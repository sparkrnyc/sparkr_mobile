export class TeamModel {
    constructor(
      public id: number,
      public name: string,
      public description: string,
      public members: number[],
      public invitations: number[],
    ){}
}
