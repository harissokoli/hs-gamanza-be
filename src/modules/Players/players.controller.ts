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
import { PlayersService } from '@modules/Players/players.service';
import { IPlayersController } from '@modules/Players/interfaces/players.controller.interface';
import { CreatePlayerDto } from '@modules/Players/dtos/CreatePlayer.dto';

@Controller('players')
@ApiTags('Casino Players')
export class PlayersController implements IPlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('create')
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.playersService.create(createPlayerDto);
  }

  @Get(':uuid')
  async getPlayer(@Param('uuid') playerUuid: string) {
    return await this.playersService.get(playerUuid);
  }

  @Put(':uuid')
  async updatePlayer(
    @Param('uuid', ParseUUIDPipe) playerUuid: string,
    @Body() updatePlayerDto: CreatePlayerDto,
  ) {
    return await this.playersService.update(playerUuid, updatePlayerDto);
  }

  @Delete(':uuid')
  async deletePlayer(@Param('uuid', ParseUUIDPipe) playerUuid: string) {
    return await this.playersService.delete(playerUuid);
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
    description: 'Search to filter players',
  })
  async getAllPlayers(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return await this.playersService.getAllPlayers(page, limit, search);
  }

  @Post('play/:playerUuid/game/:gameUuid')
  async addPlayerToGame(
    @Param('playerUuid') playerUuid: string,
    @Param('gameUuid') gameUuid: string,
  ) {
    return await this.playersService.addPlayerToGame(playerUuid, gameUuid);
  }

  @Delete('play/:playerUuid/game/:gameUuid')
  async removePlayerFromGame(
    @Param('playerUuid') playerUuid: string,
    @Param('gameUuid') gameUuid: string,
  ) {
    return await this.playersService.removePlayerFromGame(playerUuid, gameUuid);
  }
}
