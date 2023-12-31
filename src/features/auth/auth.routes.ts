import { Router } from 'express';
import { AuthController } from './auth.controller';
import { ValidationMiddleware } from '@/core/middlewares/validation.middleware';
import { CreateUserDto, SigninUserDto } from './auth.dto';
import { AuthMiddleware } from '@/features/auth/auth.middleware';
import { Routes } from '@/core/interfaces/routes.interface';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .get('/auth/n', this.auth.authn)
      .get('/auth/callback', this.auth.authncb)
      .post('/signup', ValidationMiddleware(CreateUserDto), this.auth.signup)
      .post('/signin', ValidationMiddleware(SigninUserDto), this.auth.signin)
      .post('/signout', AuthMiddleware, this.auth.signout)
      .post('/verify', AuthMiddleware, this.auth.verify);
  };
}
