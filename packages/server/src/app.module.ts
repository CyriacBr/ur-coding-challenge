import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserProfilesModule } from './modules/user-profiles/user-profiles.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { LocationsModule } from './modules/locations/locations.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    UserProfilesModule,
    AccountsModule,
    LocationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
