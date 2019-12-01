import { Module } from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { LocationsController } from "./locations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Location } from "./locations.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationsService],
  controllers: [LocationsController],
  exports: [LocationsService, TypeOrmModule]
})
export class LocationsModule {}
