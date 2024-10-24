import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, } from 'typeorm';
import { Wallets } from './wallet.entity';

@Entity()
export class Deals{
@PrimaryGeneratedColumn({ type: 'int4' })
id: number;

@Column({type:'varchar', })
property_name:string;

@Column({type:'varchar', })
property_apartment:string;

@Column({type:'varchar', })
property_area:string;

@Column({type:'timestamp', })
property_unit_sale_date:Date;

@Column({type:'varchar', })
developer_name:string;

@Column({type:'int', })
developer_commission:number;

@Column({type:'timestamp', })
expected_commission_paydate:Date;

@ManyToOne(() =>Wallets, (wallets) => wallets)
@JoinColumn({ name: 'deal' })
deal: number;

@CreateDateColumn({ type: 'timestamp' })
created_on: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_on: Date;
}