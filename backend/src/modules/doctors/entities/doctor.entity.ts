import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DB_CONSTANTS } from '../../../common/constants/db.constants';

@Entity({ name: 'doctors' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  designation?: string;

  @Column({ nullable: true })
  qualification?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  rating?: string;

  @Column({ nullable: true })
  reviews?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column({ type: 'text', nullable: true })
  philosophy?: string;

  // ✅ Soft delete flag
  @Column({
    type: 'boolean',
    default: DB_CONSTANTS.IS_DELETED.NO,
  })
  isDeleted!: boolean;

  // ✅ Auto timestamps
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}