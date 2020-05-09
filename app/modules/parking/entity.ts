import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { ParkStatus } from "./enum";

import { CarPark } from "../carpark/entity";
import { CarSize } from "../carpark/enum";
@Entity()
export class Parking {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column({length:32})
  code: string;

  @Column({
    type: "int",
  })
  priority: number;

  @Column({
    type: "enum",
    enum: ParkStatus,
    default: ParkStatus.ready,
  })
  status: string;

  @Column({
    type: "enum",
    enum: CarSize,
    default: CarSize.small,
  })
  parkSize: string;

  @OneToMany((type) => CarPark, (v) => v.park)
  cars: CarPark[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
