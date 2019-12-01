import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm";
import { IShop } from "common";
import { Location } from "../locations/locations.entity";
import { User } from "../users/users.entity";

@Entity()
export class Shop implements IShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(type => Location)
  location: Location;

  @ManyToOne(type => User, user => user.likedShops)
  user: User;
}
