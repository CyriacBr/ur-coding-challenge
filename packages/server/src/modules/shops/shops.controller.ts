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
import { ShopsService } from "./shops.service";
import { Shop } from "./shops.entity";

@Controller("shops")
export class ShopsController {
  constructor(private readonly service: ShopsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.service.findById(Number(id));
  }

  @Post()
  create(@Body() data: Shop) {
    return this.service.create(data);
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
