import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./accounts.entity";
import { JWTModule } from "../jwt/jwt.module";

@Module({
  imports: [TypeOrmModule.forFeature([Account]), JWTModule],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService, TypeOrmModule]
})
export class AccountsModule {}
