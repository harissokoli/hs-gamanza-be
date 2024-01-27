import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ICommonEntity } from './interfaces/common-entity.interfaces';
import { Exclude } from 'class-transformer';

export abstract class CommonEntity extends BaseEntity implements ICommonEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	@Exclude()
	deleted_at: Date;
}
