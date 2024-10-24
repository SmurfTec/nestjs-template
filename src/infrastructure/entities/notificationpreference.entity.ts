import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class NotificationPreferences{
@PrimaryGeneratedColumn({ type: 'int4' })
id: number;

@Column({type:'varchar',nullable: false, })
category:string;

@Column({type:'boolean',default: false, })
allow_email:boolean;

@Column({type:'boolean',default: false, })
allow_push:boolean;

@ManyToOne(() =>Users, (users) => users)
@JoinColumn({ name: 'user' })
user: number;

@CreateDateColumn({ type: 'timestamp' })
created_on: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_on: Date;
}