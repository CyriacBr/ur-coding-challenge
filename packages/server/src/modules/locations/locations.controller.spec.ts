import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { DatabaseModule } from 'src/database.module';
import { LocationsModule } from './locations.module';

describe('Locations Controller', () => {
  let controller: LocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, LocationsModule],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
