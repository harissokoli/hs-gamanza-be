import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AuditEntity } from 'src/helpers/customBaseEntites/AuditEntity';
import { PlayersEntity } from 'src/modules/Players/entities/players.entity';

@Entity('games')
export class GamesEntity extends AuditEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => PlayersEntity)
  @JoinTable()
  players: PlayersEntity[];
}
