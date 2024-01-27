import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GamesRepository } from '@modules/Games/repositories/games.repository';
import { GamesEntity } from '@modules/Games/entities/games.entity';

@Injectable()
export class GameSeederService {
  constructor(
    @InjectRepository(GamesEntity)
    private readonly gamesRepository: GamesRepository,
  ) {}

  async checkIfDataExists() {
    const games = await this.gamesRepository.find();

    return games.length > 0;
  }

  async seed() {
    const gamesToSeed = [
      { title: 'Game 1', description: 'Description 1' },
      { title: 'Game 2', description: 'Description 2' },
    ];

    await Promise.all(
      gamesToSeed.map(async (gameData) => {
        const game = this.gamesRepository.create(gameData);
        await this.gamesRepository.save(game);
      }),
    );

    console.log('Games seeded successfully.');
  }
}
