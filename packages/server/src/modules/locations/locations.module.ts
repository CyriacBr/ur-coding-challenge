import { Module, forwardRef } from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { LocationsController } from "./locations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Location } from "./locations.entity";
import { UsersModule } from "../users/users.module";
import { JWTModule } from "../jwt/jwt.module";

@Module({
  imports: [TypeOrmModule.forFeature([Location]), forwardRef(() => UsersModule), JWTModule],
  providers: [LocationsService],
  controllers: [LocationsController],
  exports: [LocationsService, TypeOrmModule]
})
export class LocationsModule {}
