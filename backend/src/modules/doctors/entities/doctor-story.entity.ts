import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'doctor_stories' })
export class DoctorStory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  doctorId!: number;

  @Column({ type: 'text' })
  url!: string;

  @Column({ default: 0 })
  sequence!: number;

  @CreateDateColumn()
  createdAt!: Date;
}