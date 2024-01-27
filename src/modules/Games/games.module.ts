import { Module } from '@nestjs/common';
import { GamesController } from 'src/modules/Games/games.controller';
import { GamesService } from 'src/modules/Games/games.service';
import { GamesRepository } from 'src/modules/Games/repositories/games.repository';
import { GamesEntity } from 'src/modules/Games/entities/games.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomRepositoryModule } from 'src/helpers/CustomRepository.module';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([GamesRepository]),
    TypeOrmModule.forFeature([GamesEntity]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
