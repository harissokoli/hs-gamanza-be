import { Column, Entity, Index } from 'typeorm';
import { AuditEntity } from 'src/helpers/customBaseEntites/AuditEntity';

@Entity('games')
export class GamesEntity extends AuditEntity {
  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  // @Index({ unique: true })
}
