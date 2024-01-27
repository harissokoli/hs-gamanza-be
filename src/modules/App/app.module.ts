import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from 'src/modules/App/app.controller';
import { AppService } from 'src/modules/App/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesEntity } from 'src/modules/Games/entities/games.entity';
import { GamesModule } from 'src/modules/Games/games.module';
import { PlayersEntity } from 'src/modules/Players/entities/players.entity';
import { PlayersModule } from 'src/modules/Players/players.module';
import { GamesRepository } from 'src/modules/Games/repositories/games.repository';
import { PlayersRepository } from 'src/modules/Players/repositories/players.repository';
import { CustomRepositoryModule } from 'src/helpers/CustomRepository.module';
import { GlobalSeederService } from 'src/modules/Seeder/global-seeder.service';
import { PlayerSeederService } from 'src/modules/Seeder/player-seeder.service';
import { GameSeederService } from 'src/modules/Seeder/game-seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([GamesEntity, PlayersEntity]),
    GamesModule,
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PlayerSeederService,
    GameSeederService,
    GlobalSeederService,
  ],
})
export class AppModule {}
