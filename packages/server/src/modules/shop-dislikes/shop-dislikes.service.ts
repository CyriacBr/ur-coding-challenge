import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { ShopDislike } from './shop-dislikes.entity';
import { User } from '../users/users.entity';
import { Shop } from '../shops/shops.entity';
import { UsersService } from '../users/users.service';
import { ShopsService } from '../shops/shops.service';

@Injectable()
export class ShopDislikesService {
  constructor(
    @InjectRepository(ShopDislike)
    private readonly repository: Repository<ShopDislike>,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => ShopsService))
    private readonly shopService: ShopsService,
  ) {}

  async applyDislikes(userId: number, shops: Shop[]) {
    const dislikes = await this.repository.find({
      where: { user: { id: userId } },
      relations: ['shop', 'user'],
    });
    const expiredDislikes = dislikes
      .map(dislike => {
        const date1 = dislike.date;
        const date2 = new Date();
        const hoursDiff =
          Math.abs(date1.getTime() - date2.getTime()) / (60 * 60 * 1000);
        if (hoursDiff >= 2) return dislike;
        return null;
      })
      .filter(v => !!v);
    for (const dislike of expiredDislikes) {
      await this.repository.delete(dislike.id);
    }
    const validDislikes = dislikes.filter(
      dislike => !expiredDislikes.find(d => d.id === dislike.id),
    );
    return shops.filter(v => !validDislikes.find(d => d.shop.id === v.id));
  }

  async add(userId: number, shopId: number) {
    const user = await this.userService.findById(userId);
    const shop = await this.shopService.findById(shopId);
    return this.create({
      id: undefined,
      date: new Date(),
      shop,
      user,
    });
  }

  remove(userId: number, shopId: number) {
    return this.repository.delete({
      user: { id: userId },
      shop: { id: shopId },
    });
  }

  findAll() {
    return this.repository.find({
      relations: ['shop', 'user'],
    });
  }

  findById(id: number) {
    return this.repository.findOne(id, {
      relations: ['shop', 'user'],
    });
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
