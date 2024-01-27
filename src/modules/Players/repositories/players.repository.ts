import { BaseCustomRepository } from '@helpers//customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '@decorators//CustomRepository.decorator';
import { PlayersEntity } from '@modules/Players/entities/players.entity';
import { IPlayersRepository } from '@modules/Players/interfaces/players.repository.interface';

@CustomRepository(PlayersEntity)
export class PlayersRepository
  extends BaseCustomRepository<PlayersEntity>
  implements IPlayersRepository
{
  create: any;
}
