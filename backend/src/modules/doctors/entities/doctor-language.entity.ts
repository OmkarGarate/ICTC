import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'doctor_languages' })
export class DoctorLanguage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  doctorId!: number;

  @Column()
  language!: string;

  @Column({ default: 0 })
  sequence!: number;

  @CreateDateColumn()
  createdAt!: Date;
}