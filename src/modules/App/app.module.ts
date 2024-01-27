import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from 'src/modules/App/app.controller';
import { AppService } from 'src/modules/App/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesEntity } from 'src/modules/Games/entities/games.entity';
import { GamesModule } from 'src/modules/Games/games.module';

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
    TypeOrmModule.forFeature([GamesEntity]),
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
