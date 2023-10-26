import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UnitStatusEnum {
  INACTIVE = 0,
  ACTIVE = 1,
}

@Entity('ppt_units')
export class Unit {
  @PrimaryGeneratedColumn()
  unit_id: number;

  @Column()
  project_id: number;

  @Column()
  name: string;

  @Column()
  clean_name: string;

  @Column()
  coordinates: string;

  @Column({
    type: 'enum',
    enum: UnitStatusEnum,
    default: UnitStatusEnum.INACTIVE,
  })
  status: UnitStatusEnum;

  @Column('json')
  temps: string;
}
