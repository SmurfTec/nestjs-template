import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, } from 'typeorm';
import { Deals } from './deal.entity';

@Entity()
export class DealAttachments{
@PrimaryGeneratedColumn({ type: 'int4' })
id: number;

@Column({type:'varchar', })
attachment:string;

@Column({type:'varchar', })
resource_id:string;

@ManyToOne(() =>Deals, (deals) => deals)
@JoinColumn({ name: 'deal' })
deal: number;

@CreateDateColumn({ type: 'timestamp' })
created_on: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_on: Date;
}