import { Test, TestingModule } from '@nestjs/testing';
import { ShopDislikesController } from './shop-dislikes.controller';
import { DatabaseModule } from 'src/database.module';
import { ShopDislikesModule } from './shop-dislikes.module';

describe('ShopDislikes Controller', () => {
  let controller: ShopDislikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ShopDislikesModule],
    }).compile();

    controller = module.get<ShopDislikesController>(ShopDislikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
