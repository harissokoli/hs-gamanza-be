import { GamesEntity } from '@modules/Games/entities/games.entity';
import { IBaseCustomRepository } from '@helpers//customBaseRepository/interfaces/BaseCustomRepository.interface';

export interface IGamesRepository extends IBaseCustomRepository<GamesEntity> {
  create: any;
}
