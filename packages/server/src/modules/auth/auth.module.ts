import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccountsModule } from '../accounts/accounts.module';
import { UsersModule } from '../users/users.module';
import { UserProfilesModule } from '../user-profiles/user-profiles.module';
import { BCryptService } from 'src/utils/bcrypt.service';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'secret12356789',
    }),
    AccountsModule,
    UsersModule,
    UserProfilesModule
  ],
  providers: [AuthService, BCryptService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
