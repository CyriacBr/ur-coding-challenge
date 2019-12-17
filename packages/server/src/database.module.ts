import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database:
        process.env.NODE_ENV === 'production'
          ? 'ur_code_challenge_cyriac'
          : 'ur_code_challenge_cyriac_dev',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      keepConnectionAlive: true,
      //logging: true
    }),
  ],
})
export class DatabaseModule {}
