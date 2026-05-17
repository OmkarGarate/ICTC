import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'service_faqs' })
export class ServiceFaq {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  serviceId!: number;

  @Column({ type: 'text' })
  question!: string;

  @Column({ type: 'text' })
  answer!: string;

  @Column({ default: 0 })
  sequence!: number;

  @CreateDateColumn()
  createdAt!: Date;
}