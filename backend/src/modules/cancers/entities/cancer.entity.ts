import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { DB_CONSTANTS } from '../../../common/constants/db.constants';
import { CancerCategory } from './cancer-category';

@Entity({ schema: 'hospital', name: 'cancers' })
export class Cancer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  coverImage?: string;

  @Column({ nullable: true })
  altText?: string;

  @Column({ nullable: true })
  seoTitle?: string;

  @Column({ type: 'text', nullable: true })
  metaDescription?: string;

  // ── Category (optional) ──────────────────────────────────────────────────
  @Column({ nullable: true })
  categoryId?: number;

  @ManyToOne(() => CancerCategory, { nullable: true, onDelete: 'SET NULL', eager: false })
  @JoinColumn({ name: 'categoryId' })
  category?: CancerCategory;

  // ── Rich-text sections (each tab = one HTML column) ──────────────────────

  @Column({ type: 'text', nullable: true })
  overview?: string;

  @Column({ type: 'text', nullable: true })
  riskFactors?: string;

  @Column({ type: 'text', nullable: true })
  symptoms?: string;

  @Column({ type: 'text', nullable: true })
  diagnosis?: string;

  @Column({ type: 'text', nullable: true })
  treatment?: string;

  @Column({ type: 'text', nullable: true })
  dosAndDonts?: string;

  // ✅ Soft delete
  @Column({ type: 'boolean', default: DB_CONSTANTS.IS_DELETED.NO })
  isDeleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}