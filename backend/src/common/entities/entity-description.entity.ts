import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'entity_descriptions' })
export class EntityDescription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entityId!: number;

  @Column()
  entityType!: string; // 'center', 'doctor'

  @Column()
  descriptionId!: number;

  @Column({ default: 0 })
  sequence!: number;
}