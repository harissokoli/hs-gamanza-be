import { PlayersEntity } from '@modules/Players/entities/players.entity';
import { CreatePlayerDto } from '@modules/Players/dtos/CreatePlayer.dto';

export interface IPlayersController {
  createPlayer(createPlayerDto: CreatePlayerDto): Promise<PlayersEntity>;
  getPlayer(gameUuid: string): Promise<PlayersEntity>;
  updatePlayer(
    gameUuid: string,
    updatePlayerDto: CreatePlayerDto,
  ): Promise<PlayersEntity>;
  deletePlayer(playerUuid: string): Promise<void>;
  getAllPlayers(
    page?: number,
    limit?: number,
    search?: string,
  ): Promise<PlayersEntity[] | PaginatedResponse<PlayersEntity>>;
  addPlayerToGame(playerUuid: string, gameUuid: string): Promise<void>;
  removePlayerFromGame(playerUuid: string, gameUuid: string): Promise<void>;
}
