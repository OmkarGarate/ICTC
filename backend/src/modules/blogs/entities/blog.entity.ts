import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DB_CONSTANTS } from '../../../common/constants/db.constants';

@Entity({
  schema: 'blogs', name: 'blogs' })
export class Blog {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  // "Blog" | "News" | "Article" etc.
  @Column({ default: 'Blog' })
  type!: string;

  @Column({ nullable: true })
  date?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  author?: string;

  // cover image path e.g. /uploads/abc.jpg
  @Column({ nullable: true })
  image?: string;

  // TipTap rich-text stored as JSON string
  @Column({ type: 'text', nullable: true })
  content?: string;

  // SEO
  @Column({ nullable: true })
  metaTitle?: string;

  @Column({ type: 'text', nullable: true })
  metaDescription?: string;

  @Column({ nullable: true })
  keywords?: string;

  // Soft delete
  @Column({
    type: 'boolean',
    default: DB_CONSTANTS.IS_DELETED.NO,
  })
  isDeleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}