import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { IPlayersService } from '@modules/Players/interfaces/players.service.interface';
import { PlayersEntity } from '@modules/Players/entities/players.entity';
import { PlayersRepository } from '@modules/Players/repositories/players.repository';
import { CreatePlayerDto } from '@modules/Players/dtos/CreatePlayer.dto';
import { checkEmailValidity } from '@helpers//checkEmailValidity';
import { GamesEntity } from '@modules/Games/entities/games.entity';
import { GamesRepository } from '@modules/Games/repositories/games.repository';

@Injectable()
export class PlayersService implements IPlayersService {
  constructor(
    @InjectRepository(PlayersEntity)
    private playersRepository: PlayersRepository,
    @InjectRepository(GamesEntity)
    private gamesRepository: GamesRepository,
  ) {}

  async create(player: CreatePlayerDto) {
    const isExisting = await this.playersRepository.findOneBy({
      email: player.email,
    });

    if (!isExisting) {
      if (!checkEmailValidity(player.email)) {
        throw new BadRequestException(
          `Email: ${player.email} is invalid, please double-check the email!`,
        );
      }

      const newPlayer = this.playersRepository.create(player);

      return await this.playersRepository.save(newPlayer);
    }

    throw new BadRequestException(
      `Player with email: "${player.email}" already exists!`,
    );
  }

  async get(playerUuid: string) {
    if (!uuidValidate(playerUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const player = await this.playersRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.games_played', 'games_played')
      .where('player.uuid = :uuid', { uuid: playerUuid })
      .getOne();

    if (player) {
      return player;
    }

    throw new NotFoundException(`Player with UUID: ${playerUuid} not found`);
  }

  async update(playerUuid: string, playerUpdateDto: CreatePlayerDto) {
    if (!uuidValidate(playerUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const p = await this.playersRepository.findOneBy({
      uuid: playerUuid,
    });

    if (!p) {
      throw new NotFoundException(`Player with UUID: ${playerUuid} not found`);
    }

    await this.playersRepository.update({ uuid: playerUuid }, playerUpdateDto);

    return await this.playersRepository.findOneBy({
      uuid: playerUuid,
    });
  }

  async delete(playerUuid: string) {
    if (!uuidValidate(playerUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    // In case we need to delete it completely
    // const deleteResult = await this.playersRepository.delete({ uuid: playerUuid });

    // In case we need to keep the record
    const deleteResult = await this.playersRepository.update(
      { uuid: playerUuid },
      { deleted_at: new Date() },
    );

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Player with UUID: ${playerUuid} not found`);
    }
  }

  async getAllPlayers(page?: number, limit?: number, search?: string) {
    if (!page || !limit) {
      let query = await this.playersRepository
        .createQueryBuilder('player')
        .leftJoinAndSelect('player.games_played', 'games_played');

      if (search) {
        query = query.where(
          'player.first_name LIKE :search OR player.last_name LIKE :search',
          {
            search: `${search}%`,
          },
        );
      }

      return await query.getMany();
    }

    const query = await this.playersRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.games_played', 'games_played');

    if (search) {
      query.where(
        'player.first_name LIKE :search OR player.last_name LIKE :search',
        {
          search: `${search}%`,
        },
      );
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

  async addPlayerToGame(playerUuid: string, gameUuid: string) {
    if (!uuidValidate(playerUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }
    if (!uuidValidate(gameUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const player = await this.playersRepository.findOneBy({ uuid: playerUuid });
    const game = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.players', 'players')
      .where('game.uuid = :uuid', { uuid: gameUuid })
      .getOne();

    const playerAlreadyExists = game.players.some(
      (existingPlayer) => existingPlayer.id === player.id,
    );

    if (!playerAlreadyExists) {
      await this.gamesRepository
        .createQueryBuilder()
        .relation(GamesEntity, 'players')
        .of(game)
        .add(player);
    } else {
      throw new BadRequestException('This player is already playing this game');
    }
  }

  async removePlayerFromGame(playerUuid: string, gameUuid: string) {
    if (!uuidValidate(playerUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }
    if (!uuidValidate(gameUuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const player = await this.playersRepository.findOneBy({ uuid: playerUuid });
    const game = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.players', 'players')
      .where('game.uuid = :uuid', { uuid: gameUuid })
      .getOne();

    const playerExists = game.players.some(
      (existingPlayer) => existingPlayer.id === player.id,
    );

    if (playerExists) {
      await this.gamesRepository
        .createQueryBuilder()
        .relation(GamesEntity, 'players')
        .of(game)
        .remove(player);
    } else {
      throw new BadRequestException(`This player isn't playing this game`);
    }
  }
}
