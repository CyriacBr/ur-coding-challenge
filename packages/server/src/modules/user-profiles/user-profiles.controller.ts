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
import { UserProfilesService } from "./user-profiles.service";
import { UserProfile } from "./user-profiles.entity";
import { AuthGuard } from "../jwt/auth.guard";
import { Request } from "express";

@Controller("user-profiles")
export class UserProfilesController {
  constructor(private readonly service: UserProfilesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.service.findById(Number(id));
  }

  @Post()
  create(@Body() data: UserProfile) {
    return this.service.create(data);
  }

  @Post("bulk")
  createBulk(@Body() data: Array<UserProfile>) {
    return this.service.createBulk(data);
  }

  @Put(":id")
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: UserProfile) {
    return this.service.update(Number(id), data);
  }

  @UseGuards(AuthGuard)
  @Patch()
  updateFromUser(@Req() req: Request, @Body() data: UserProfile) {
    //@ts-ignore
    const userId = req.userId as number;
    return this.service.updateFromUser(userId, data);
  }

  @Put("bulk")
  @Patch("bulk")
  updateBulk(@Body() data: Array<UserProfile>) {
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
