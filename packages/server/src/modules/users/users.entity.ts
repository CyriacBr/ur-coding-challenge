import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { IUser } from 'common';
import { Account } from "../accounts/accounts.entity";
import { UserProfile } from "../user-profiles/user-profiles.entity";

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
}
