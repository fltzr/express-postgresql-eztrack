import { Request } from 'express';

export type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  birthdate: string;
  gender: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
};

export type TokenData = {
  token: string;
  expiresIn: number;
};

export type SigninData = {
  username: string;
  password: string;
};

export type SigninResponse = {
  cookie: string;
  user: User;
};

export interface DataStoredInToken {
  id: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
