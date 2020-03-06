import { Module, forwardRef } from "@nestjs/common";
import { ShopDislikesService } from "./shop-dislikes.service";
import { ShopDislikesController } from "./shop-dislikes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopDislike } from "./shop-dislikes.entity";
import { UsersModule } from "../users/users.module";
import { ShopsModule } from "../shops/shops.module";
import { JWTModule } from "../jwt/jwt.module";

@Module({
  imports: [TypeOrmModule.forFeature([ShopDislike]), UsersModule, forwardRef(() => ShopsModule), JWTModule],
  providers: [ShopDislikesService],
  controllers: [ShopDislikesController],
  exports: [ShopDislikesService, TypeOrmModule]
})
export class ShopDislikesModule {}
