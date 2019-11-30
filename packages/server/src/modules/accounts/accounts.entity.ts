import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IAccount } from "common";

@Entity()
export class Account implements IAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;
}
