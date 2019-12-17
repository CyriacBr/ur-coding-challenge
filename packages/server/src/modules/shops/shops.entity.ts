import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
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
  @JoinColumn()
  location: Location;

  @ManyToMany(type => User, user => user.likedShops)
  likedFromUsers?: User[];
}
