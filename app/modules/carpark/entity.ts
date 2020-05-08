import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne
} from "typeorm"
import{
  CarSize
    } from './enum'
import {Parking} from '../parking/entity'
@Entity()
export class CarPark {
  @PrimaryGeneratedColumn({type:'bigint'})
  id: number

  @Index('plateNumber')
  @Column({})
  plateNumber: string

  @Index('carSize')
  @Column({
    type: "enum",
    enum: CarSize
  })
  size: string

  // @Index('parkStatus')
  // @Column({
  //   type: "enum",
  //   enum: CarStatus,
  //   default:CarStatus.atCounter
  // })
  // parkStatus: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @ManyToOne(type => Parking, v =>  v.id)
  park: Parking

  @Column({ type: 'bigint'  })
  parkId: number;
}
