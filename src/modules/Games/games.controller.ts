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
import { GamesEntity } from 'src/modules/Games/entities/games.entity';
import { CreateGameDto } from 'src/modules/Games/dtos/CreateGame.dto';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('create')
  async createGame(@Body() createGameDto: CreateGameDto): Promise<GamesEntity> {
    return await this.gamesService.create(createGameDto);
  }

  @Get(':uuid')
  async getGame(@Param('uuid') gameUuid: string): Promise<GamesEntity> {
    return await this.gamesService.get(gameUuid);
  }

  @Put(':uuid')
  async updateGame(
    @Param('uuid', ParseUUIDPipe) gameUuid: string,
    @Body() updateGameDto: CreateGameDto,
  ): Promise<GamesEntity> {
    return await this.gamesService.update(gameUuid, updateGameDto);
  }

  @Delete(':uuid')
  async deleteGame(
    @Param('uuid', ParseUUIDPipe) gameUuid: string,
  ): Promise<void> {
    return await this.gamesService.delete(gameUuid);
  }
}
