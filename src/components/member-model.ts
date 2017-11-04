export class MemberModel {
    constructor(
      public id: string,
      public loginType: string,
      public name: string,
      public username: string,
      public password: string,
      public email: string,
      public emailVerified: boolean,
      public thumbnail: string,
      public linkedin: string,
      public github: string,
      public college: string,
      public major: string,
      public bio: string,
      public role: string,
      public realm: string
    ){}
}