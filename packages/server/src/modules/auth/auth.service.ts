import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AuthDTO } from 'common';
import { Account } from '../accounts/accounts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BCryptService } from 'src/utils/bcrypt.service';
import { User } from '../users/users.entity';
import { UserProfile } from '../user-profiles/user-profiles.entity';
import { Location } from '../locations/locations.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    private readonly bcryptService: BCryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: AuthDTO.SignIn) {
    const account = await this.accountRepository.findOne({ name: dto.email });
    if (!account) {
      return null;
    }
    const user = await this.userRepository.findOne({
      where: { account: { id: account.id } },
      relations: ['profile'],
    });
    const match = await this.bcryptService.compare(
      dto.password,
      account.password,
    );
    if (match) {
      return this.makeToken({
        userId: user.id,
        profile: user.profile,
      });
    }
    return null;
  }

  async signUp(dto: AuthDTO.SignUp) {
    const existingAccount = await this.accountRepository.findOne({
      name: dto.email,
    });
    if (existingAccount) {
      return null;
    }
    const password = await this.bcryptService.crypt(dto.password);
    const account = new Account();
    account.name = dto.email;
    account.password = password;
    await this.accountRepository.save(account);
    const profile = new UserProfile();
    profile.email = dto.email;
    profile.firstName = dto.firstName;
    profile.lastName = dto.lastName;
    await this.profileRepository.save(profile);
    const location = new Location();
    location.latitude = dto.latitude;
    location.longitude = dto.longitude;
    await this.locationRepository.save(location);
    let user = new User();
    user.account = account;
    user.profile = profile;
    user.location = location;
    user = await this.userRepository.save(user);
    return this.makeToken({
      userId: user.id,
      profile,
    });
  }

  makeToken(payload: AuthDTO.Payload) {
    return {
      token: this.jwtService.sign(payload),
    };
  }

  me({ token }: AuthDTO.Me): AuthDTO.Payload {
    return this.jwtService.decode(token) as any;
  }
}
