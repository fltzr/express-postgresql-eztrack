import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { AuthService } from './auth.service';
import { RequestWithUser, SigninData } from './auth.types';

export class AuthController {
  public auth = Container.get(AuthService);

  public authn = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {};

  public authncb = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {};

  public signup = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {};

  public signin = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const signinData = request.body as SigninData;
      const { cookie, user } = await this.auth.signin(signinData);

      response.cookie('Authorization', cookie);
      response.setHeader('Set-Cookie', [cookie]);
      response.status(200).json({ data: user, message: 'signin' });
    } catch (error) {
      next(error);
    }
  };

  public signout = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      response.setHeader('Set-Cookie', ['Authorization=; Max-Age=0']);
      response.status(200).json();
    } catch (error) {
      next(error);
    }
  };

  public verify = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const user = request.user;

      response.status(200).json({ data: user, message: 'verify' });
    } catch (error) {
      next(error);
    }
  };
}
