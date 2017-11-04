export class LoginDetailsModel {
  
  constructor(
    public loginType: string = 'loopback',
    public username: string,
    public password: string
  ){}
}