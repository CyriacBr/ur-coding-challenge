import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ShopDislike } from "./shop-dislikes.entity";

@Injectable()
export class ShopDislikesService {
  constructor(
    @InjectRepository(ShopDislike)
    private readonly repository: Repository<ShopDislike>
  ) {}

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOne(id);
  }

  create(data: ShopDislike) {
    return this.repository.save(data);
  }

  createBulk(data: ShopDislike[]) {
    const tasks: Array<Promise<ShopDislike>> = [];
    for (const item of data) {
      tasks.push(this.repository.save(item));
    }
    try {
      return Promise.all(tasks);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, data: ShopDislike) {
    return this.repository.update(id, data);
  }

  updateBulk(data: ShopDislike[]) {
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
      .from(ShopDislike)
      .whereInIds(ids)
      .execute();
  }
}
