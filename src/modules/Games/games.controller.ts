import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { GamesEntity } from 'src/modules/Games/entities/games.entity';
import { CreateGameDto } from 'src/modules/Games/dtos/CreateGame.dto';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getHello(): string {
    return this.gamesService.getHello();
  }

  @Post('create-game')
  async createGame(
    @Body() createGameDto: CreateGameDto,
  ): Promise<GamesEntity | string> {
    return await this.gamesService.create(createGameDto);
  }
}
