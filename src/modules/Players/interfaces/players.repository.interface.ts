import { IBaseCustomRepository } from 'src/helpers/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { PlayersEntity } from 'src/modules/Players/entities/players.entity';

export interface IPlayersRepository
  extends IBaseCustomRepository<PlayersEntity> {
  create: any;
}
