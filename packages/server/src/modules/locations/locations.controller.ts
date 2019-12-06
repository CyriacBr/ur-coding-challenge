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
import { LocationsService } from "./locations.service";
import { Location } from "./locations.entity";

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
