import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(game: CreateGameDto): Promise<GamesEntity | string> {
    const isExisting = await this.gamesRepository.findOneBy({
      title: game.title,
    });

    if (!isExisting) {
      const newGame = this.gamesRepository.create(game);

      return await this.gamesRepository.save(newGame);
    }

    throw new BadRequestException(`Game: "${game.title}" already exists!`);
  }

  getHello(): string {
    return 'Hello World! 123';
  }
}
