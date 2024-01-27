import { GamesEntity } from 'src/modules/Games/entities/games.entity';
import { BaseCustomRepository } from 'src/helpers/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from 'src/decorators/CustomRepository.decorator';
import { IGamesRepository } from 'src/modules/Games/interfaces/games.repository.interface';

@CustomRepository(GamesEntity)
export class GamesRepository
  extends BaseCustomRepository<GamesEntity>
  implements IGamesRepository
{
  create: any;
}
