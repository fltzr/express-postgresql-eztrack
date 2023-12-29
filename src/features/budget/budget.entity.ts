import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { BudgetItem } from './budget.interfaces';
import { UserEntity } from '../auth/auth.entity';

@Entity()
export class BudgetItemEntity extends BaseEntity implements BudgetItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  value: string;

  @Column()
  category: string;

  @Column()
  userId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, user => user.budgetItems)
  user: UserEntity;
}
