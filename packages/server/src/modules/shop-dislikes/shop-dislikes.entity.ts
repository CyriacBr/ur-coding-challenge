import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { IShopDislike } from "common";
import { User } from "../users/users.entity";
import { Shop } from "../shops/shops.entity";

@Entity()
export class ShopDislike implements IShopDislike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(type => User)
  user: User;

  @ManyToOne(type => Shop)
  shop: Shop;
}
