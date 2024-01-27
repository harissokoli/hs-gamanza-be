import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { IGamesService } from '@modules/Games/interfaces/games.service.interface';
import { GamesEntity } from '@modules/Games/entities/games.entity';
import { GamesRepository } from '@modules/Games/repositories/games.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from '@modules/Games/dtos/CreateGame.dto';

@Injectable()
export class GamesService implements IGamesService {
  constructor(
    @InjectRepository(GamesEntity)
    private gamesRepository: GamesRepository,
  ) {}

  async create(game: CreateGameDto) {
    const isExisting = await this.gamesRepository.findOneBy({
      title: game.title,
    });

    if (!isExisting) {
      const newGame = this.gamesRepository.create(game);

      return await this.gamesRepository.save(newGame);
    }

    throw new BadRequestException(`Game: "${game.title}" already exists!`);
  }

  async get(gameUuid: string) {
    if (!uuidValidate(gameUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const game = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.players', 'players')
      .where('game.uuid = :uuid', { uuid: gameUuid })
      .getOne();

    if (game) {
      return game;
    }

    throw new NotFoundException(`Game with UUID: ${gameUuid} not found`);
  }

  async update(gameUuid: string, gameUpdateDto: CreateGameDto) {
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

  async delete(gameUuid: string) {
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

  async getAllGames(page?: number, limit?: number, search?: string) {
    if (!page || !limit) {
      let query = await this.gamesRepository
        .createQueryBuilder('game')
        .leftJoinAndSelect('game.players', 'players');

      if (search) {
        query = query.where('game.title LIKE :search', {
          search: `${search}%`,
        });
      }

      return await query.getMany();
    }

    const query = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.players', 'players');

    if (search) {
      query.where('game.title LIKE :search', {
        search: `${search}%`,
      });
    }

    query.skip((page - 1) * limit).take(limit);

    const [results, total] = await query.getManyAndCount();

    return {
      data: results,
      total,
      page: Number(page),
      last_page: Math.ceil(total / limit),
    };
  }
}
