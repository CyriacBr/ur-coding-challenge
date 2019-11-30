import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { DatabaseModule } from 'src/database.module';
import { AccountsModule } from './accounts.module';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseModule, AccountsModule],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
