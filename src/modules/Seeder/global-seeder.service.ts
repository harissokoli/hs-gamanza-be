import { Injectable } from '@nestjs/common';
import { GameSeederService } from '@modules/Seeder/game-seeder.service';
import { PlayerSeederService } from '@modules/Seeder/player-seeder.service';

@Injectable()
export class GlobalSeederService {
  constructor(
    private readonly playerSeederService: PlayerSeederService,
    private readonly gameSeederService: GameSeederService,
  ) {}

  async seedAll() {
    const playersExist = await this.playerSeederService.checkIfDataExists();
    const gamesExist = await this.gameSeederService.checkIfDataExists();

    // Run seeds only if there's no existing data
    if (!playersExist) {
      await this.playerSeederService.seed();
    } else {
      console.log('Players exists, skipping seeds.');
    }

    if (!gamesExist) {
      await this.gameSeederService.seed();
    } else {
      console.log('Games exists, skipping seeds.');
    }
  }
}

