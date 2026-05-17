import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'blogs', name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  tag!: string;
}