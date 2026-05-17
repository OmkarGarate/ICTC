import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DB_CONSTANTS } from '../../../common/constants/db.constants';

@Entity({ schema: 'hospital', name: 'services' })
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  coverImage?: string;

  @Column({ nullable: true })
  altText?: string;

  @Column({ nullable: true })
  seoTitle?: string;

  @Column({ type: 'text', nullable: true })
  metaDescription?: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  // ✅ Category FK — nullable so existing services don't break
  @Column({ nullable: true, type: 'int' })
  categoryId?: number | null;

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