import { BaseCustomRepository } from 'src/helpers/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from 'src/decorators/CustomRepository.decorator';
import { PlayersEntity } from 'src/modules/Players/entities/players.entity';
import { IPlayersRepository } from 'src/modules/Players/interfaces/players.repository.interface';

@CustomRepository(PlayersEntity)
export class PlayersRepository
  extends BaseCustomRepository<PlayersEntity>
  implements IPlayersRepository
{
  create: any;
}
