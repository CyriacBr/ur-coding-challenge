import { IUserProfile } from ".";
import { ServerError } from "./base";

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
  export type Error = ServerError & {
    alreadyRegistered?: boolean;
    accountNotFound?: boolean;
    incorrectCredentials?: boolean;
  };
}
