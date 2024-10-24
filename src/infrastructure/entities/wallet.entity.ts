import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, } from 'typeorm';

@Entity()
export class Wallets{
@PrimaryGeneratedColumn({ type: 'int4' })
id: number;

@Column({type:'int', })
amount:number;

@Column({type:'varchar', })
bank_name:string;

@Column({type:'varchar', })
full_legal_name:string;

@Column({type:'varchar', })
account_number:string;

@CreateDateColumn({ type: 'timestamp' })
created_on: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_on: Date;
}