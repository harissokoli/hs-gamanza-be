import { CreateGameDto } from 'src/modules/Games/dtos/CreateGame.dto';
import { GamesEntity } from 'src/modules/Games/entities/games.entity';

export interface IGamesController {
  createGame(createGameDto: CreateGameDto): Promise<GamesEntity>;
  getGame(gameUuid: string): Promise<GamesEntity>;
  updateGame(
    gameUuid: string,
    updateGameDto: CreateGameDto,
  ): Promise<GamesEntity>;
  deleteGame(gameUuid: string): Promise<void>;
}
