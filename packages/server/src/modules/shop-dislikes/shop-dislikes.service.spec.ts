import { Test, TestingModule } from '@nestjs/testing';
import { ShopDislikesService } from './shop-dislikes.service';
import { DatabaseModule } from 'src/database.module';
import { ShopDislikesModule } from './shop-dislikes.module';

describe('ShopDislikesService', () => {
  let service: ShopDislikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ShopDislikesModule],
    }).compile();

    service = module.get<ShopDislikesService>(ShopDislikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
