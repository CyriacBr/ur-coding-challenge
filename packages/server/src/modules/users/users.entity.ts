import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { IUser } from 'common';
import { Account } from "../accounts/accounts.entity";
import { UserProfile } from "../user-profiles/user-profiles.entity";
import { Location } from "../locations/locations.entity";
import { Shop } from "../shops/shops.entity";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Account)
  @JoinColumn()
  account: Account;

  @OneToOne(type => UserProfile, profile => profile.user)
  @JoinColumn()
  profile: UserProfile;

  @OneToOne(type => Location)
  @JoinColumn()
  location: Location;

  @OneToMany(type => Shop, shop => shop.user)
  likedShops: Shop[];
}
