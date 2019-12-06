import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ILocation } from "common";

@Entity()
export class Location implements ILocation{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;
}
