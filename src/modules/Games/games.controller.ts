import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from 'src/modules/Games/dtos/CreateGame.dto';
import { IGamesController } from 'src/modules/Games/interfaces/games.controller.interface';

@Controller('games')
@ApiTags('Games')
export class GamesController implements IGamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('create')
  async createGame(@Body() createGameDto: CreateGameDto) {
    return await this.gamesService.create(createGameDto);
  }

  @Get(':uuid')
  async getGame(@Param('uuid') gameUuid: string) {
    return await this.gamesService.get(gameUuid);
  }

  @Put(':uuid')
  async updateGame(
    @Param('uuid', ParseUUIDPipe) gameUuid: string,
    @Body() updateGameDto: CreateGameDto,
  ) {
    return await this.gamesService.update(gameUuid, updateGameDto);
  }

  @Delete(':uuid')
  async deleteGame(@Param('uuid', ParseUUIDPipe) gameUuid: string) {
    return await this.gamesService.delete(gameUuid);
  }
}
