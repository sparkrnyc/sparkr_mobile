export class ProfileModel {
    constructor(
      public id: number,
      public name: string,
      public thumbnail: string,
      public email: string,
      public linkedin: string,
      public college: string,
      public major: string,
      public bio: string,
      public role: string
    ){}
}