import { Module, forwardRef } from "@nestjs/common";
import { UserProfilesService } from "./user-profiles.service";
import { UserProfilesController } from "./user-profiles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "./user-profiles.entity";
import { UsersModule } from "../users/users.module";
import { JWTModule } from "../jwt/jwt.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile]), forwardRef(() => UsersModule), JWTModule],
  providers: [UserProfilesService],
  controllers: [UserProfilesController],
  exports: [UserProfilesService, TypeOrmModule]
})
export class UserProfilesModule {}
