import { JwtService } from "@nestjs/jwt";
import { TestingModule, Test } from "@nestjs/testing";
import { JWTModule } from "./jwt.module";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "./auth.guard";
import { DatabaseModule } from "src/database.module";

describe('JWT Module', () => {
  let jwtService: JwtService;
  let authService: AuthService;
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, JWTModule, AuthModule],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    authService = module.get<AuthService>(AuthService);
    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should correctly extract userId from Bearer', () => {
    const {token} = authService.makeToken({
      userId: 10,
      profile: null
    });
    const userId = authGuard.extractUser('Bearer ' + token);
    expect(userId).toBe(10);
  });
});