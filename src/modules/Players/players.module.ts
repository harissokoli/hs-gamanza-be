import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomRepositoryModule } from 'src/helpers/CustomRepository.module';
import { PlayersRepository } from 'src/modules/Players/repositories/players.repository';
import { PlayersEntity } from 'src/modules/Players/entities/players.entity';
import { PlayersController } from 'src/modules/Players/players.controller';
import { PlayersService } from 'src/modules/Players/players.service';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([PlayersRepository]),
    TypeOrmModule.forFeature([PlayersEntity]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
