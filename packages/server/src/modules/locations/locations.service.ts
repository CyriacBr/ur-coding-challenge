import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Location } from "./locations.entity";
import { User } from "../users/users.entity";

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly repository: Repository<Location>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOne(id);
  }

  create(data: Location) {
    return this.repository.save(data);
  }

  createBulk(data: Location[]) {
    const tasks: Array<Promise<Location>> = [];
    for (const item of data) {
      tasks.push(this.repository.save(item));
    }
    try {
      return Promise.all(tasks);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, data: Location) {
    return this.repository.update(id, data);
  }

  async updateFromUser(userId: number, data: Location) {
    const user = await this.userRepository.findOneOrFail(userId, {
      relations: ['profile']
    });
    return this.repository.update(user.profile.id, data);
  }

  updateBulk(data: Location[]) {
    const tasks: Array<Promise<UpdateResult>> = [];
    for (const item of data) {
      tasks.push(this.repository.update(item.id, item));
    }
    try {
      return Promise.all(tasks);
    } catch (error) {
      throw error;
    }
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

  deleteBulk(idList: string) {
    const ids = idList.split(/D/).map(value => parseInt(value, 10));
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(Location)
      .whereInIds(ids)
      .execute();
  }
}
