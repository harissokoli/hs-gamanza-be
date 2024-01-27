import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { PlayersController } from '@modules/Players/players.controller';
import { PlayersService } from '@modules/Players/players.service';
import { PlayersEntity } from '@modules/Players/entities/players.entity';
import { PlayersRepository } from '@modules/Players/repositories/players.repository';

describe('PlayersController', () => {
  let playersController: PlayersController;
  let playersService: PlayersService;

  function createPlayerData(overrides?: Partial<PlayersEntity>): PlayersEntity {
    const defaultData: PlayersEntity = {
      created_at: undefined,
      deleted_at: undefined,
      games_played: [],
      id: 1,
      updated_at: undefined,
      uuid: '1e6f1cfc-3f83-40c5-a8d3-98f5c067c0d8',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      dob: new Date('1990-01-01'),
    };

    return Object.assign({}, defaultData, overrides);
  }

  beforeEach(async () => {
    jest.useFakeTimers();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [PlayersService, PlayersRepository, ValidationPipe],
    })
      .overrideProvider(PlayersService)
      .useValue({
        create: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        getAllPlayers: jest.fn(),
      })
      .compile();

    playersService = module.get<PlayersService>(PlayersService);
    playersController = module.get<PlayersController>(PlayersController);
  });

  describe('create', () => {
    it('should create a new player', async () => {
      const playerData = createPlayerData({
        first_name: 'Alice',
        email: 'alice@example.com',
      });

      jest.spyOn(playersService, 'create').mockResolvedValue(playerData);

      const result = await playersService.create(playerData);

      expect(result).toBe(playerData);
    });
  });

  describe('get', () => {
    it('should get a player by UUID', async () => {
      const playerUuid = '1e6f1cfc-3f83-40c5-a8d3-98f5c067c0d8';
      const playerData = createPlayerData();

      jest.spyOn(playersService, 'get').mockResolvedValue(playerData);

      const result = await playersService.get(playerUuid);

      expect(result).toBe(playerData);
    });
  });

  it('should delete a player', async () => {
    const playerUuid = '1e6f1cfc-3f83-40c5-a8d3-98f5c067c0d8';

    jest
      .spyOn(playersService, 'get')
      .mockResolvedValue({ uuid: playerUuid } as PlayersEntity);

    jest.spyOn(playersService, 'delete').mockResolvedValue();

    await expect(playersService.delete(playerUuid)).resolves.not.toThrow();
    expect(playersService.delete).toHaveBeenCalledWith(playerUuid);
    expect(playersService.delete).toHaveBeenCalledTimes(1);
  });
});
