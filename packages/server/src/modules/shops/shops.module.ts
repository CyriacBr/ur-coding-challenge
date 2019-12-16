import { Module, forwardRef } from "@nestjs/common";
import { ShopsService } from "./shops.service";
import { ShopsController } from "./shops.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shop } from "./shops.entity";
import { ShopDislikesModule } from "../shop-dislikes/shop-dislikes.module";
import { UsersModule } from "../users/users.module";
import { LocationsModule } from "../locations/locations.module";
import { JWTModule } from "../jwt/jwt.module";

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), UsersModule, forwardRef(() => ShopDislikesModule), LocationsModule, JWTModule],
  providers: [ShopsService],
  controllers: [ShopsController],
  exports: [ShopsService, TypeOrmModule]
})
export class ShopsModule {}
