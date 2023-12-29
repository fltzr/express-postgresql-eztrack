import { IsDateString, IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { type User } from './auth.types';
import { BudgetItemEntity } from '../budget/budget.entity';

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column()
  @IsNotEmpty()
  @Unique(['username'])
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  firstname: string;

  @Column()
  @IsNotEmpty()
  lastname: string;

  @Column()
  @IsNotEmpty()
  phone: string;

  @Column()
  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @Column()
  @IsNotEmpty()
  gender: string;

  @Column()
  @IsNotEmpty()
  address1: string;

  @Column()
  address2: string;

  @Column()
  @IsNotEmpty()
  city: string;

  @Column()
  @IsNotEmpty()
  state: string;

  @Column()
  @IsNotEmpty()
  zipcode: string;

  @Column()
  @IsNotEmpty()
  country: string;

  @OneToMany(() => BudgetItemEntity, item => item.userId)
  budgetItems: BudgetItemEntity[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
