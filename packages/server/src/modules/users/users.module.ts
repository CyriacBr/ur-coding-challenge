import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { AccountsModule } from "../accounts/accounts.module";
import { UserProfilesModule } from "../user-profiles/user-profiles.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AccountsModule, UserProfilesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
