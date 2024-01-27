import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from '@modules/App/app.controller';
import { AppService } from '@modules/App/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesEntity } from '@modules/Games/entities/games.entity';
import { GamesModule } from '@modules/Games/games.module';
import { PlayersEntity } from '@modules/Players/entities/players.entity';
import { PlayersModule } from '@modules/Players/players.module';
import { GlobalSeederService } from '@modules/Seeder/global-seeder.service';
import { PlayerSeederService } from '@modules/Seeder/player-seeder.service';
import { GameSeederService } from '@modules/Seeder/game-seeder.service';

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
