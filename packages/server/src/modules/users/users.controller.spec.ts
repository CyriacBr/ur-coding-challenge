import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database.module';
import { UserProfilesModule } from '../user-profiles/user-profiles.module';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseModule, UserProfilesModule],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
