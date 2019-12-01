import { Test, TestingModule } from '@nestjs/testing';
import { ShopsController } from './shops.controller';
import { DatabaseModule } from 'src/database.module';
import { ShopsModule } from './shops.module';

describe('Shops Controller', () => {
  let controller: ShopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ShopsModule],
    }).compile();

    controller = module.get<ShopsController>(ShopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
