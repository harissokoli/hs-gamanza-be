import { GamesEntity } from '@modules/Games/entities/games.entity';
import { BaseCustomRepository } from '@helpers//customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '@decorators//CustomRepository.decorator';
import { IGamesRepository } from '@modules/Games/interfaces/games.repository.interface';

@CustomRepository(GamesEntity)
export class GamesRepository
  extends BaseCustomRepository<GamesEntity>
  implements IGamesRepository
{
  create: any;
}
