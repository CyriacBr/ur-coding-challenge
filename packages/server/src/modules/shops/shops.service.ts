import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Shop } from "./shops.entity";

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly repository: Repository<Shop>
  ) {}

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOne(id);
  }

  create(data: Shop) {
    return this.repository.save(data);
  }

  createBulk(data: Shop[]) {
    const tasks: Array<Promise<Shop>> = [];
    for (const item of data) {
      tasks.push(this.repository.save(item));
    }
    try {
      return Promise.all(tasks);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, data: Shop) {
    return this.repository.update(id, data);
  }

  updateBulk(data: Shop[]) {
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
      .from(Shop)
      .whereInIds(ids)
      .execute();
  }
}
