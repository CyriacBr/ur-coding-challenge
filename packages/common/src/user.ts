import { IUserProfile } from "./userProfile";
import { IAccount } from "./account";
import { ILocation } from "./location";
import { IShop } from "./shop";

export interface IUser {
  id: number;
  profile: IUserProfile;
  account: IAccount;
  location: ILocation;
  likedShops: IShop[];
}