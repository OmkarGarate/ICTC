    import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    } from 'typeorm';

    import { DB_CONSTANTS } from '../../../common/constants/db.constants';

    @Entity({ schema: 'hospital', name: 'centers' })
    export class Center {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    slug!: string;

    @Column()
    name!: string;

    @Column()
    fullName!: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    rating?: string;

    @Column({ nullable: true })
    reviews?: string;

    @Column({ nullable: true })
    timing?: string;

    @Column({ type: 'float', nullable: true })
    lat?: number;

    @Column({ type: 'float', nullable: true })
    lng?: number;

    @Column({ nullable: true })
    mapQuery?: string;

    @Column({ type: 'text', nullable: true })
    mapEmbed?: string;

    @Column({ type: 'text', nullable: true })
    address?: string;

    @Column({ nullable: true })
    heroImage?: string;

    @Column({ nullable: true })
    centerImage?: string;

    // ✅ Soft delete flag
    @Column({
        type: 'boolean',
        default: DB_CONSTANTS.IS_DELETED.NO,
    })
    isDeleted!: boolean;

    // ✅ Auto timestamps
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
    }