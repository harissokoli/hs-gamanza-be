import { GamesEntity } from 'src/modules/Games/entities/games.entity';
import { CreateGameDto } from 'src/modules/Games/dtos/CreateGame.dto';

export interface IGamesService {
  create(game: CreateGameDto): Promise<GamesEntity>;
  get(gameUuid: string): Promise<GamesEntity>;
  update(gameUuid: string, gameUpdateDto: CreateGameDto): Promise<GamesEntity>;
  delete(gameUuid: string): Promise<void>;
  getAllGames(
    page?: number,
    limit?: number,
    search?: string,
  ): Promise<GamesEntity[] | PaginatedResponse<GamesEntity>>;
}
