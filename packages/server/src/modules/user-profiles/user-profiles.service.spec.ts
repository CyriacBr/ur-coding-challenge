import { Test, TestingModule } from '@nestjs/testing';
import { UserProfilesService } from './user-profiles.service';
import { DatabaseModule } from 'src/database.module';
import { UserProfilesModule } from './user-profiles.module';

describe('UserProfilesService', () => {
  let service: UserProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UserProfilesModule],
    }).compile();

    service = module.get<UserProfilesService>(UserProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
