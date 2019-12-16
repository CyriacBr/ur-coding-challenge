import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Req,
  UseGuards
} from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { Location } from "./locations.entity";
import { Request } from "express";
import { AuthGuard } from "../jwt/auth.guard";

@Controller("locations")
export class LocationsController {
  constructor(private readonly service: LocationsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.service.findById(Number(id));
  }

  @Post()
  create(@Body() data: Location) {
    return this.service.create(data);
  }

  @Post("bulk")
  createBulk(@Body() data: Array<Location>) {
    return this.service.createBulk(data);
  }

  @Put(":id")
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: Location) {
    return this.service.update(Number(id), data);
  }

  @UseGuards(AuthGuard)
  @Patch()
  updateFromUser(@Req() req: Request, @Body() data: Location) {
    //@ts-ignore
    const userId = req.userId as number;
    console.log('userId :', userId);
    return this.service.updateFromUser(userId, data);
  }

  @Put("bulk")
  @Patch("bulk")
  updateBulk(@Body() data: Array<Location>) {
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
