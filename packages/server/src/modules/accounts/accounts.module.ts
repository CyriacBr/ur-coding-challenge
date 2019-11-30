import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./accounts.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService, TypeOrmModule]
})
export class AccountsModule {}
