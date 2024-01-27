import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomRepositoryModule } from 'src/helpers/CustomRepository.module';
import { PlayersRepository } from 'src/modules/Players/repositories/players.repository';
import { PlayersEntity } from 'src/modules/Players/entities/players.entity';
import { PlayersController } from 'src/modules/Players/players.controller';
import { PlayersService } from 'src/modules/Players/players.service';
import { GamesRepository } from 'src/modules/Games/repositories/games.repository';
import { GamesEntity } from 'src/modules/Games/entities/games.entity';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      PlayersRepository,
      GamesRepository,
    ]),
    TypeOrmModule.forFeature([PlayersEntity, GamesEntity]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
