import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Account } from "./accounts.entity";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>
  ) {}

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOne(id);
  }

  create(data: Account) {
    return this.repository.save(data);
  }

  createBulk(data: Account[]) {
    const tasks: Array<Promise<Account>> = [];
    for (const item of data) {
      tasks.push(this.repository.save(item));
    }
    try {
      return Promise.all(tasks);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, data: Account) {
    return this.repository.update(id, data);
  }

  updateBulk(data: Account[]) {
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
      .from(Account)
      .whereInIds(ids)
      .execute();
  }
}
