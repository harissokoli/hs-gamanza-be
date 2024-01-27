import { IBaseCustomRepository } from '@helpers//customBaseRepository/interfaces/BaseCustomRepository.interface';
import { PlayersEntity } from '@modules/Players/entities/players.entity';

export interface IPlayersRepository
  extends IBaseCustomRepository<PlayersEntity> {
  create: any;
}
