import { IUserProfile } from "./userProfile";
import { IAccount } from "./account";

export interface IUser {
  id: number;
  profile: IUserProfile;
  account: IAccount;
}