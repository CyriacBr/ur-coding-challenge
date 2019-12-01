import { Test, TestingModule } from '@nestjs/testing';
import { ShopsService } from './shops.service';
import { DatabaseModule } from 'src/database.module';
import { ShopsModule } from './shops.module';

describe('ShopsService', () => {
  let service: ShopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ShopsModule],
    }).compile();

    service = module.get<ShopsService>(ShopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
