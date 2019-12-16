import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database.module';
import { AuthModule } from './auth.module';
import { AccountsService } from '../accounts/accounts.service';
import { UserProfile } from '../user-profiles/user-profiles.entity';
import { User } from '../users/users.entity';
import { AuthDTO, hasServerError } from 'common';
import { Account } from '../accounts/accounts.entity';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, AuthModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("signing in a nonexisting user shouldn't work", async () => {
    const result = await service.signIn({
      email: 'fake@gmail.com',
      password: '1234',
    });
    expect(result).toBe(null);
  });

  describe('signing up', () => {
    let result: AuthDTO.Me | AuthDTO.Error;
    let user: User;

    beforeAll(async () => {
      result = await service.signUp({
        email: 'user1@gmail.com',
        firstName: 'User',
        lastName: '1',
        password: '1234',
        latitude: 500,
        longitude: 300,
      });
      expect(hasServerError<AuthDTO.Error>(result)).toBeFalsy();
      user = await userService.findByEmail('user1@gmail.com');
      expect(user.account).toBeDefined();
      expect(user.profile).toBeDefined();
      expect(user.location).toBeDefined();
    });

    it('should return a token', async () => {
      expect(result).toBeDefined();
      if(!hasServerError(result)) {
        expect(typeof result).toBe('object');
        expect(typeof result.token).toBe('string');
      }
    });

    it('an account should be created', async () => {
      const { account } = user;
      expect(account).toBeDefined();
      expect(account.name).toBe('user1@gmail.com');
      expect(account.password).not.toBe('1234');
    });

    it('a profile should be created', async () => {
      const { profile } = user;
      const { id, user: userProfile, ...data } = profile;
      expect(profile).toBeDefined();
      expect(data).toEqual({
        email: 'user1@gmail.com',
        firstName: 'User',
        lastName: '1',
      });
    });

    it('a location should be created', async () => {
      const { location } = user;
      const { id, ...data} = location;
      expect(location).toBeDefined();
      expect(data).toEqual({
        latitude: 500,
        longitude: 300
      });
    });

    it("signing up an existing user shouldn't work", async () => {
      const result = await service.signUp({
        email: 'user1@gmail.com',
        firstName: 'User',
        lastName: '1',
        password: '1234',
        latitude: 0,
        longitude: 0,
      });
      expect(result).toBe(null);
    });

    it("signing in an existing user should work", async () => {
      const result = await service.signIn({
        email: 'user1@gmail.com',
        password: '1234',
      });
      expect(result).toBeDefined();
      if(!hasServerError(result)) {
        expect(typeof result).toBe('object');
        expect(typeof result.token).toBe('string');
      }
    });

    afterAll(async () => {
      await userService.delete(user.id);
    })

  });

});
