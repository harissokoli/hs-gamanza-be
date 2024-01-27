import { Column, Entity, ManyToMany } from 'typeorm';
import { AuditEntity } from 'src/helpers/customBaseEntites/AuditEntity';
import { GamesEntity } from 'src/modules/Games/entities/games.entity';

@Entity('players')
export class PlayersEntity extends AuditEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  dob: Date;

  @ManyToMany(() => GamesEntity, (game) => game.players)
  gamesPlayed: GamesEntity[];
}
