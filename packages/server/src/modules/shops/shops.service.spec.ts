import { Test, TestingModule } from '@nestjs/testing';
import { ShopsService } from './shops.service';
import { DatabaseModule } from 'src/database.module';
import { ShopsModule } from './shops.module';
import { Shop } from './shops.entity';
import { User } from '../users/users.entity';
import { locationDistance } from 'common';
import { ShopDislikesService } from '../shop-dislikes/shop-dislikes.service';
import { UsersService } from '../users/users.service';
import { LocationsService } from '../locations/locations.service';
import { Location } from '../locations/locations.entity';

async function makeFixtures(
  locationService: LocationsService,
  userService: UsersService,
  service: ShopsService,
) {
  let location = await locationService.create({
    id: undefined,
    latitude: 500,
    longitude: 500,
  });
  const user = await userService.create({
    id: undefined,
    account: null,
    likedShops: [],
    location,
    profile: null,
  });
  let locationA = await locationService.create({
    id: undefined,
    latitude: 100,
    longitude: 200,
  });
  let locationB = await locationService.create({
    id: undefined,
    latitude: 500,
    longitude: 2000,
  });
  let locationC = await locationService.create({
    id: undefined,
    latitude: 8000,
    longitude: 500,
  });
  const shops = await service.createBulk([
    {
      id: undefined,
      name: 'Shop A',
      location: locationA,
      likedFromUsers: []
    },
    {
      id: undefined,
      name: 'Shop B',
      location: locationB,
      likedFromUsers: []
    },
    {
      id: undefined,
      name: 'Shop C',
      location: locationC,
      likedFromUsers: []
    },
  ]);
  const orderedShops = shops.sort((a, b) => {
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
  return { user, shops, orderedShops };
}

describe('ShopsService', () => {
  let service: ShopsService;
  let dislikeService: ShopDislikesService;
  let userService: UsersService;
  let locationService: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ShopsModule],
    }).compile();

    service = module.get<ShopsService>(ShopsService);
    dislikeService = module.get<ShopDislikesService>(ShopDislikesService);
    userService = module.get<UsersService>(UsersService);
    locationService = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("'findNearbyShops'", () => {
    let user: User;
    let shops: Shop[];
    let orderedShops: Shop[];
    beforeAll(async () => {
      const fixtures = await makeFixtures(
        locationService,
        userService,
        service,
      );
      user = fixtures.user;
      shops = fixtures.shops;
      orderedShops = fixtures.orderedShops;
    });

    afterAll(async () => {
      jest
        .spyOn(userService, 'delete')
        .mockImplementation(function(id: number) {
          return this.repository.delete(id);
        });
      try {
        await userService.delete(user.id);
        for (const shop of shops) {
          await service.delete(shop.id);
        }
      } catch (error) {
        console.error(error);
      }
    });

    it('should work by default', async () => {
      const expectedShops = await service.findNearbyShops(user.id);
      expect(expectedShops).toEqual(orderedShops);
    });

    it('should work with a dislike', async () => {
      const shopDislikeId = shops[1].id;

      await dislikeService.add(user.id, shopDislikeId);
      let expectedShops = await service.findNearbyShops(user.id);
      expect(expectedShops).toEqual(
        orderedShops.filter(v => v.id !== shopDislikeId),
      );

      await dislikeService.remove(user.id, shopDislikeId);
      expectedShops = await service.findNearbyShops(user.id);
      expect(expectedShops).toEqual(orderedShops);
    });

    it('should work with an expired dislike', async () => {
      const shopDislikeId = shops[1].id;
      const date = new Date();
      date.setHours(date.getHours() - 3);
      const shop = await service.findById(shopDislikeId);
      const dislike = await dislikeService.create({
        id: undefined,
        date,
        shop,
        user,
      });

      const expectedShops = await service.findNearbyShops(user.id);
      expect(expectedShops).toEqual(orderedShops);

      await dislikeService.delete(dislike.id);
    });
  });

  describe("'findLikedShops'", () => {
    let user: User;
    let shops: Shop[];
    beforeAll(async () => {
      const fixtures = await makeFixtures(
        locationService,
        userService,
        service,
      );
      user = fixtures.user;
      shops = fixtures.shops;
    });

    afterAll(async () => {
      jest
        .spyOn(userService, 'delete')
        .mockImplementation(function(id: number) {
          return this.repository.delete(id);
        });
      try {
        await userService.delete(user.id);
        for (const shop of shops) {
          await service.delete(shop.id);
        }
      } catch (error) {
        console.error(error);
      }
    });

    it('should work with a like', async () => {
      let likedShops = await service.findLikedShops(user.id);
      expect(likedShops.length).toBe(0);

      let shop = shops[1];
      await service.likeShop(user.id, shop.id);
      likedShops = await service.findLikedShops(user.id);
      expect(likedShops.length).toEqual(1);
      expect(likedShops[0].id).toBe(shop.id);

      shop = await service.findById(shop.id);
      expect(shop.likedFromUsers.length).toBe(1);
      expect(shop.likedFromUsers[0].id).toBe(user.id);
    });

    it('should work with with a unlike', async () => {
      await service.unlikeShop(user.id, shops[1].id);
      let likedShops = await service.findLikedShops(user.id);
      expect(likedShops.length).toBe(0);
    });
  });
});
