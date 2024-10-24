import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, } from 'typeorm';
import { Wallets } from './wallet.entity';

@Entity()
export class WalletTransactions{
@PrimaryGeneratedColumn({ type: 'int4' })
id: number;

@Column({type:'int', })
amount:number;

@ManyToOne(() =>Wallets, (wallets) => wallets)
@JoinColumn({ name: 'wallet' })
wallet: number;

@CreateDateColumn({ type: 'timestamp' })
created_on: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_on: Date;
}