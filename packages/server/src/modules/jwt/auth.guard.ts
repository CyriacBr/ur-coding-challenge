import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from 'common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const str = request.headers.authorization;
    const userId = this.extractUser(str);
    if (!userId) return false;
    //@ts-ignore
    request.userId = data.userId;
    return true;
  }

  extractUser(authStr: string) {
    if (!authStr) return null;
    const token = authStr.replace('Bearer', '').trim();
    if (!token) return null;
    const data: AuthDTO.Payload = this.jwtService.decode(token) as any;
    if (!data) return null;
    return data.userId;
  }
}
