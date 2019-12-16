import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { AccountsModule } from "../accounts/accounts.module";
import { UserProfilesModule } from "../user-profiles/user-profiles.module";
import { LocationsModule } from "../locations/locations.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AccountsModule, forwardRef(() => UserProfilesModule), LocationsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
