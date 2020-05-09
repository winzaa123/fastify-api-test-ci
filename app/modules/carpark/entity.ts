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
  CarSize,CarStatus
    } from './enum'
import {Parking} from '../parking/entity'
@Entity()
export class CarPark {
  @PrimaryGeneratedColumn({type:'bigint'})
  id: number

  @Index('plateNumber')
  @Column({length:32})
  plateNumber: string

  @Index('carSize')
  @Column({
    type: "enum",
    enum: CarSize
  })
  size: string

  @Index('parkStatus')
  @Column({
    type: "enum",
    enum: CarStatus,
    default:CarStatus.park
  })
  carStatus: string

  @CreateDateColumn()
  checkInAt: string

  @UpdateDateColumn()
  updatedAt: string

  @ManyToOne(type => Parking, v =>  v.id)
  park: Parking

  @Column({ type: 'bigint'  })
  parkId: number;
}
