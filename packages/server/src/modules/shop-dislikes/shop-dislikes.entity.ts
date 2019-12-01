import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { IShopDislike } from "common";
import { User } from "../users/users.entity";
import { Shop } from "../shops/shops.entity";

@Entity()
export class ShopDislike implements IShopDislike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @OneToOne(type => Shop)
  @JoinColumn()
  shop: Shop;
}
