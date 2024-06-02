import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;
      const token = authorization?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException();
      }

      const decoded = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });

      res.locals.logginSession = decoded;

      res.locals.user = decoded.id;

      next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
