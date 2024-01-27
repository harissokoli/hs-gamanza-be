import { CreatePlayerDto } from 'src/modules/Players/dtos/CreatePlayer.dto';
import { PlayersEntity } from 'src/modules/Players/entities/players.entity';

export interface IPlayersService {
  create(player: CreatePlayerDto): Promise<PlayersEntity>;
  get(playerUuid: string): Promise<PlayersEntity>;
  update(
    playerUuid: string,
    playerUpdateDto: CreatePlayerDto,
  ): Promise<PlayersEntity>;
  delete(playerUuid: string): Promise<void>;
  getAllPlayers(
    page?: number,
    limit?: number,
    search?: string,
  ): Promise<PlayersEntity[] | PaginatedResponse<PlayersEntity>>;
  addPlayerToGame(playerUuid: string, gameUuid: string): Promise<void>;
  removePlayerFromGame(playerUuid: string, gameUuid: string): Promise<void>;
}
