import { IUserProfile } from ".";

export namespace AuthDTO {
  export interface SignUp {
    firstName: string;
    lastName: string;
    latitude: number;
    longitude: number;
    
    email: string;
    password: string;
  }
  export interface SignIn {
    email: string;
    password: string;
  }
  export interface Payload {
    userId: number;
    profile: IUserProfile;
  }
  export interface Me {
    token: string;
  }
}