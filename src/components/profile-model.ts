export class ProfileModel {
    constructor(
      public id: number,
      public username: string,
      public thumbnail: string,
      public email: string,
      public linkedin: string,
      public firstname: string,
      public lastname: string,
      public city: string,
      public state: string,
      public country: string,
      public college: string,
      public degree: string,
      public company: string,
      public bio: string,
      public role: string
    ){}
}