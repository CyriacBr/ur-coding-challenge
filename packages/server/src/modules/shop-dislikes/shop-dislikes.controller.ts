import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Patch,
  Delete
} from "@nestjs/common";
import { ShopDislikesService } from "./shop-dislikes.service";
import { ShopDislike } from "./shop-dislikes.entity";

@Controller("shop-dislikes")
export class ShopDislikesController {
  constructor(private readonly service: ShopDislikesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.service.findById(Number(id));
  }

  @Post()
  create(@Body() data: ShopDislike) {
    return this.service.create(data);
  }

  @Post("bulk")
  createBulk(@Body() data: Array<ShopDislike>) {
    return this.service.createBulk(data);
  }

  @Put(":id")
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: ShopDislike) {
    return this.service.update(Number(id), data);
  }

  @Put("bulk")
  @Patch("bulk")
  updateBulk(@Body() data: Array<ShopDislike>) {
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
