import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { IUserProfile } from 'common';
import { User } from "../users/users.entity";

@Entity()
export class UserProfile implements IUserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User, user => user.profile)
  user: User;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;
}
