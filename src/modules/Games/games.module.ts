import { Module } from '@nestjs/common';
import { GamesController } from '@modules/Games/games.controller';
import { GamesService } from '@modules/Games/games.service';
import { GamesRepository } from '@modules/Games/repositories/games.repository';
import { GamesEntity } from '@modules/Games/entities/games.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomRepositoryModule } from '@helpers//CustomRepository.module';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([GamesRepository]),
    TypeOrmModule.forFeature([GamesEntity]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
