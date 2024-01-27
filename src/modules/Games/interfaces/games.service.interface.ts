import { GamesEntity } from 'src/modules/Games/entities/games.entity';

export interface IGamesService {
  create(game: GamesEntity): Promise<GamesEntity | string>;
}
