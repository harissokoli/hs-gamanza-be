import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayersEntity } from '@modules/Players/entities/players.entity';
import { PlayersRepository } from '@modules/Players/repositories/players.repository';

@Injectable()
export class PlayerSeederService {
  constructor(
    @InjectRepository(PlayersEntity)
    private playersRepository: PlayersRepository,
  ) {}

  async checkIfDataExists() {
    const players = await this.playersRepository.find();

    return players.length > 0;
  }

  async seed() {
    const playersToSeed = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        dob: new Date(),
      },
      {
        first_name: 'Alice',
        last_name: 'Smith',
        email: 'alice@example.com',
        dob: new Date(),
      },
    ];

    await Promise.all(
      playersToSeed.map(async (playerData) => {
        const player = this.playersRepository.create(playerData);
        await this.playersRepository.save(player);
      }),
    );

    console.log('Players seeded successfully.');
  }
}
