import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'blogs', name: 'blog_tags' })
export class BlogTag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  blogId!: number;

  @Column()
  tagId!: number;   
}