import { PlayersEntity } from 'src/modules/Players/entities/players.entity';
import { CreatePlayerDto } from 'src/modules/Players/dtos/CreatePlayer.dto';

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
}
