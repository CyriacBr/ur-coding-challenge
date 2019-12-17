import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Shop } from './shops.entity';
import { UsersService } from '../users/users.service';
import { ShopDislikesService } from '../shop-dislikes/shop-dislikes.service';
import { locationDistance } from 'common';
import { Location } from '../locations/locations.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly repository: Repository<Shop>,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => ShopDislikesService))
    private readonly shopDislikeService: ShopDislikesService,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}


  async findNearbyShops(userId: number) {
    const user = await this.userService.findById(userId);
    let shops = await this.findAll();
    shops = await this.shopDislikeService.applyDislikes(userId, shops);
    return shops.sort((a, b) => {
      const aDistance = locationDistance(
        user.location.latitude,
        user.location.longitude,
        a.location.latitude,
        a.location.longitude,
      );
      const bDistance = locationDistance(
        user.location.latitude,
        user.location.longitude,
        b.location.latitude,
        b.location.longitude,
      );
      return aDistance - bDistance;
    });
  }

  async likeShop(userId: number, shopId: number) {
    const user = await this.userService.findById(userId);
    const shop = await this.findById(shopId);
    user.likedShops.push(shop);
    await this.userService.update(userId, user);
  }

  dislikeShop(userId: number, shopId: number) {
    return this.shopDislikeService.add(userId, shopId);
  }

  async findLikedShops(userId: number) {
    const user = await this.userService.findById(userId);
    return user.likedShops;
  }

  findAll() {
    return this.repository.find({
      relations: ['location'],
    });
  }

  findById(id: number) {
    return this.repository.findOne(id, {
      relations: ['location'],
    });
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

  async delete(id: number) {
    const shop = await this.findById(id);
    const result = await this.repository.delete(id);
    await this.locationRepository.delete(shop.location.id);
    return result;
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
