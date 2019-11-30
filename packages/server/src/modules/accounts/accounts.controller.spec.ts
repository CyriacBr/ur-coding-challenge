import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { DatabaseModule } from 'src/database.module';
import { AccountsModule } from './accounts.module';

describe('Accounts Controller', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, AccountsModule],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
