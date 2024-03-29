import { CreateGameDto } from '@modules/Games/dtos/CreateGame.dto';
import { GamesEntity } from '@modules/Games/entities/games.entity';

export interface IGamesController {
  createGame(createGameDto: CreateGameDto): Promise<GamesEntity>;
  getGame(gameUuid: string): Promise<GamesEntity>;
  updateGame(
    gameUuid: string,
    updateGameDto: CreateGameDto,
  ): Promise<GamesEntity>;
  deleteGame(gameUuid: string): Promise<void>;
  getAllGames(
    page?: number,
    limit?: number,
    search?: string,
  ): Promise<GamesEntity[] | PaginatedResponse<GamesEntity>>;
}
