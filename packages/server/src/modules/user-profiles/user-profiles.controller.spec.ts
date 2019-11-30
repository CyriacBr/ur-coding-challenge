import { Test, TestingModule } from '@nestjs/testing';
import { UserProfilesController } from './user-profiles.controller';
import { DatabaseModule } from 'src/database.module';
import { UserProfilesModule } from './user-profiles.module';

describe('UserProfiles Controller', () => {
  let controller: UserProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseModule, UserProfilesModule],
    }).compile();

    controller = module.get<UserProfilesController>(UserProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
