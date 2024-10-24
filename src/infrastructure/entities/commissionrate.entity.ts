import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, } from 'typeorm';

@Entity()
export class CommissionRates{
@PrimaryGeneratedColumn({ type: 'int4' })
id: number;

@Column({type:'double precision',nullable: false, })
percentage:number;

@Column({type:'int',nullable: false, })
amount:number;

@Column({type:'int',nullable: false, })
from_day:number;

@Column({type:'int',nullable: false, })
to_day:number;

@CreateDateColumn({ type: 'timestamp' })
created_on: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_on: Date;
}