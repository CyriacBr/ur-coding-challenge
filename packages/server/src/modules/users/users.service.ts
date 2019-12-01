import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Account } from '../accounts/accounts.entity';
import { UserProfile } from '../user-profiles/user-profiles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOne(id, {
      relations: ['account', 'profile'],
    });
  }

  async findByEmail(email: string) {
    const account = await this.accountRepository.findOneOrFail({
      name: email,
    });
    return this.repository.findOneOrFail(
      {
        account: { id: account.id },
      },
      {
        relations: ['account', 'profile'],
      },
    );
  }

  create(data: User) {
    return this.repository.save(data);
  }

  createBulk(data: User[]) {
    const tasks: Array<Promise<User>> = [];
    for (const item of data) {
      tasks.push(this.repository.save(item));
    }
    try {
      return Promise.all(tasks);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, data: User) {
    return this.repository.update(id, data);
  }

  updateBulk(data: User[]) {
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
    const user = await this.findById(id);
    const result = await this.repository.delete(id);
    await this.profileRepository.delete(user.profile.id);
    await this.accountRepository.delete(user.account.id);
    return result;
  }

  deleteBulk(idList: string) {
    const ids = idList.split(/D/).map(value => parseInt(value, 10));
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(User)
      .whereInIds(ids)
      .execute();
  }
}
