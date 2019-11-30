import { IUserProfile } from "./userProfile";

export namespace AuthDTO {
  export interface signUp {
    email: string;
    password: string;
  }
  export interface signIn {
    email: string;
    password: string;
  }
  export interface payload {
    userId: number;
    profile: IUserProfile;
  }
}