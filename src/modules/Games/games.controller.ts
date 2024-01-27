import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
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

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page for pagination',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search to filter games',
  })
  async getAllGames(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return await this.gamesService.getAllGames(page, limit, search);
  }
}
