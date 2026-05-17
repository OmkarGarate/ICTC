import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'descriptions' })
export class Description {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  content!: string;
}