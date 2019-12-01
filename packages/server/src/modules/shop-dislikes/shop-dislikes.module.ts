import { Module } from "@nestjs/common";
import { ShopDislikesService } from "./shop-dislikes.service";
import { ShopDislikesController } from "./shop-dislikes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopDislike } from "./shop-dislikes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ShopDislike])],
  providers: [ShopDislikesService],
  controllers: [ShopDislikesController],
  exports: [ShopDislikesService, TypeOrmModule]
})
export class ShopDislikesModule {}
