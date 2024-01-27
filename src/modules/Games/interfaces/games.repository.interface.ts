import { GamesEntity } from 'src/modules/Games/entities/games.entity';
import { IBaseCustomRepository } from 'src/helpers/customBaseRepository/interfaces/BaseCustomRepository.interface';

export interface IGamesRepository extends IBaseCustomRepository<GamesEntity> {
  create: any;
}
