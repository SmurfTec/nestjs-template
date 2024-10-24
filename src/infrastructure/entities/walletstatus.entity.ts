import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, JoinColumn, } from 'typeorm';
import { Wallets } from './wallet.entity';

@Entity()
export class WalletStatuses{
@PrimaryGeneratedColumn({ type: 'int4' })
id: number;

@Column({type:'varchar', })
name:string;

@OneToMany(() =>Wallets, (wallets) => wallets)
wallet:Wallets[];

@CreateDateColumn({ type: 'timestamp' })
created_on: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_on: Date;
}