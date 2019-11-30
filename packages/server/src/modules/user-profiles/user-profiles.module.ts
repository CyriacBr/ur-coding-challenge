import { Module } from "@nestjs/common";
import { UserProfilesService } from "./user-profiles.service";
import { UserProfilesController } from "./user-profiles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "./user-profiles.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [UserProfilesService],
  controllers: [UserProfilesController],
  exports: [UserProfilesService, TypeOrmModule]
})
export class UserProfilesModule {}
