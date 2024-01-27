import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { IGamesService } from 'src/modules/Games/interfaces/games.service.interface';
import { GamesEntity } from 'src/modules/Games/entities/games.entity';
import { GamesRepository } from 'src/modules/Games/repositories/games.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from 'src/modules/Games/dtos/CreateGame.dto';

@Injectable()
export class GamesService implements IGamesService {
  constructor(
    @InjectRepository(GamesEntity)
    private gamesRepository: GamesRepository,
  ) {}

  async create(game: CreateGameDto): Promise<GamesEntity> {
    const isExisting = await this.gamesRepository.findOneBy({
      title: game.title,
    });

    if (!isExisting) {
      const newGame = this.gamesRepository.create(game);

      return await this.gamesRepository.save(newGame);
    }

    throw new BadRequestException(`Game: "${game.title}" already exists!`);
  }

  async get(gameUuid: string): Promise<GamesEntity> {
    if (!uuidValidate(gameUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const game = await this.gamesRepository.findOneBy({
      uuid: gameUuid,
    });

    if (game) {
      return game;
    }

    throw new NotFoundException(`Game with UUID: ${gameUuid} not found`);
  }

  async update(
    gameUuid: string,
    gameUpdateDto: CreateGameDto,
  ): Promise<GamesEntity> {
    if (!uuidValidate(gameUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const g = await this.gamesRepository.findOneBy({
      uuid: gameUuid,
    });

    if (!g) {
      throw new NotFoundException(`Game with UUID: ${gameUuid} not found`);
    }

    await this.gamesRepository.update({ uuid: gameUuid }, gameUpdateDto);

    return await this.gamesRepository.findOneBy({
      uuid: gameUuid,
    });
  }

  async delete(gameUuid: string): Promise<void> {
    if (!uuidValidate(gameUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    // In case we need to delete it completely
    // const deleteResult = await this.gamesRepository.delete({ uuid: gameUuid });

    // In case we need to keep the record
    const deleteResult = await this.gamesRepository.update(
      { uuid: gameUuid },
      { deleted_at: new Date() },
    );

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Game with UUID: ${gameUuid} not found`);
    }
  }
}
