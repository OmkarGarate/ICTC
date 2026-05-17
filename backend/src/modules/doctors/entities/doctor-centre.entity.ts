import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'doctor_centres' })
export class DoctorCentre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  doctorId!: number;

  @Column()
  centreId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}