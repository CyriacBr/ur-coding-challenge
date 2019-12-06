import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { DatabaseModule } from 'src/database.module';
import { LocationsModule } from './locations.module';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, LocationsModule],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
