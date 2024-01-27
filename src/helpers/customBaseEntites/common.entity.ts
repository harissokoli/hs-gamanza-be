import {
	BaseEntity,
	CreateDateColumn,
	DeleteDateColumn,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ICommonEntity } from './interfaces/common-entity.interfaces';

export abstract class CommonEntity extends BaseEntity implements ICommonEntity {
	@PrimaryGeneratedColumn()
	@Index()
	id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	@Exclude()
	deleted_at: Date;
}
