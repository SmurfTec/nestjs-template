import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, JoinColumn, } from 'typeorm';
import { Deals } from './deal.entity';

@Entity()
export class DealStatuses{
@PrimaryGeneratedColumn({ type: 'int4' })
id: number;

@Column({type:'varchar', })
name:string;

@OneToMany(() =>Deals, (deals) => deals)
deal:Deals[];

@CreateDateColumn({ type: 'timestamp' })
created_on: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_on: Date;
}