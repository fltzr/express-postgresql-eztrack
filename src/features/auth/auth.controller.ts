import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { AuthService } from './auth.service';
import { SigninData, User } from './auth.types';
import { logger } from '@/core/utils/logger';

export class AuthController {
  public auth = Container.get(AuthService);

  public signup = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userData = request.body as User;
      const signupResponse = await this.auth.signup(userData);

      response.status(200).json({ data: signupResponse, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public signin = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const signinData = request.body as SigninData;
      const { cookie, user } = await this.auth.signin(signinData);

      logger.info(`Set-Cookie: ${cookie}`);

      response.setHeader('Set-Cookie', [cookie]);
      response.status(200).json({ data: user, message: 'signin' });
    } catch (error) {
      next(error);
    }
  };

  public signout = async (request: Request, response: Response, next: NextFunction) => {
    try {
      response.setHeader('Set-Cookie', ['Authorization=; Max-Age=0']);
      response.status(200);
    } catch (error) {
      next(error);
    }
  };
}
