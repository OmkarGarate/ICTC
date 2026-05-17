import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IS_DELETED } from '../../common/constants/IS_DELETED';

@Entity({
  schema: 'auth',
  name: 'users',
})
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: IS_DELETED.FALSE, enum: [IS_DELETED.FALSE, IS_DELETED.TRUE] })
  is_deleted!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

}