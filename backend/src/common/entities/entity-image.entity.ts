import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'entity_images' })
export class EntityImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entityId!: number;

  @Column()
  entityType!: string;

  @Column()
  imageId!: number;

  @Column({ default: 0 })
  sequence!: number;
}