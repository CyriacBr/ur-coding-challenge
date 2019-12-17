import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  UseGuards,
  Req
} from "@nestjs/common";
import { ShopsService } from "./shops.service";
import { Shop } from "./shops.entity";
import { AuthGuard } from "../jwt/auth.guard";
import { Request } from "src/utils/MyRequest";

@UseGuards(AuthGuard)
@Controller("shops")
export class ShopsController {
  constructor(private readonly service: ShopsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('nearby')
  findNearby(@Req() req: Request) {
    const { userId } = req;
    return this.service.findNearbyShops(userId);
  }

  @Get('liked')
  findLiked(@Req() req: Request) {
    const { userId } = req;
    return this.service.findLikedShops(userId);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.service.findById(Number(id));
  }

  @Post()
  create(@Body() data: Shop) {
    return this.service.create(data);
  }

  @Post(':id')
  likeShop(@Req() req: Request, @Param('id') id: string) {
    const { userId } = req;
    return this.service.likeShop(userId, Number(id));
  }

  @Post(':id')
  dislikeShop(@Req() req: Request, @Param('id') id: string) {
    const { userId } = req;
    return this.service.dislikeShop(userId, Number(id));
  }

  @Post("bulk")
  createBulk(@Body() data: Array<Shop>) {
    return this.service.createBulk(data);
  }

  @Put(":id")
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: Shop) {
    return this.service.update(Number(id), data);
  }

  @Put("bulk")
  @Patch("bulk")
  updateBulk(@Body() data: Array<Shop>) {
    return this.service.updateBulk(data);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.service.delete(Number(id));
  }

  @Delete("bulk/:ids")
  deleteBulk(@Param("ids") idList: string) {
    return this.service.deleteBulk(idList);
  }
}
