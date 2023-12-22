import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@/core/config';
import { UserEntity } from '@/features/auth/auth.entity';
import { HttpException } from '@/core/exceptions/http-exception';
import { DataStoredInToken, RequestWithUser } from './auth.types';

const getAuthorization = (request: RequestWithUser) => {
  const coockie = request.cookies['Authorization'];
  if (coockie) return coockie;

  const header = request.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(request);

    if (Authorization) {
      const { id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const findUser = await UserEntity.findOne({ where: { id }, select: ['id', 'username', 'email'] });

      if (findUser) {
        request.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
