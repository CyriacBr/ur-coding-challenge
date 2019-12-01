import { IUserProfile } from "./userProfile";
import { IAccount } from "./account";
import { ILocation } from "./location";

export interface IUser {
  id: number;
  profile: IUserProfile;
  account: IAccount;
  location: ILocation;
}