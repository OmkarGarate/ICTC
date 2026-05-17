import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'hospital', name: 'doctor_centres' })
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