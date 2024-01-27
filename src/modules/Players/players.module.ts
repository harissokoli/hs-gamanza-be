import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomRepositoryModule } from '@helpers//CustomRepository.module';
import { PlayersRepository } from '@modules/Players/repositories/players.repository';
import { PlayersEntity } from '@modules/Players/entities/players.entity';
import { PlayersController } from '@modules/Players/players.controller';
import { PlayersService } from '@modules/Players/players.service';
import { GamesRepository } from '@modules/Games/repositories/games.repository';
import { GamesEntity } from '@modules/Games/entities/games.entity';

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
