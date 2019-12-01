import { Module } from "@nestjs/common";
import { ShopsService } from "./shops.service";
import { ShopsController } from "./shops.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shop } from "./shops.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  providers: [ShopsService],
  controllers: [ShopsController],
  exports: [ShopsService, TypeOrmModule]
})
export class ShopsModule {}
