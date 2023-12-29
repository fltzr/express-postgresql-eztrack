import { SECRET_KEY } from '@/core/config';
import { SigninData, SigninResponse, TokenData, User } from './auth.types';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { UserEntity } from './auth.entity';
import { HttpException } from '@/core/exceptions/http-exception';
import { compare, hash } from 'bcrypt';

const createToken = (user: Omit<User, 'password'>): TokenData => {
  const dataStoredInToken: { id: number } = { id: user.id };
  const secretKey = SECRET_KEY;
  const expiresIn = 60 * 60;

  return {
    expiresIn,
    token: sign(dataStoredInToken, secretKey, { expiresIn }),
  };
};

const createCookie = (tokenData: TokenData) => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService extends Repository<UserEntity> {
  public async signup(userData: User) {
    const findUser = await UserEntity.findOne({
      where: { email: userData.email },
    });

    if (findUser) {
      throw new HttpException(409, 'email or username is already taken.');
    }

    const hashedPassword = await hash(userData.password, 10);
    const createUserData = await UserEntity.create({
      ...userData,
      password: hashedPassword,
    }).save();

    return createUserData;
  }

  public async signin(signinData: SigninData): Promise<SigninResponse> {
    const user = await UserEntity.findOne({
      where: { username: signinData.username },
    });

    if (!user) {
      throw new HttpException(409, 'user not found.');
    }

    const isPasswordMatching = await compare(
      signinData.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(409, 'password is incorrect.');
    }

    const userWithoutPassword = { ...user, password: undefined };

    const token = createToken(userWithoutPassword);
    const cookie = createCookie(token);

    return { cookie, user };
  }
}
