import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  ORIGIN,
  CREDENTIALS,
  SECRET_KEY,
  OIDC_ISSUER,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_REDIRECT_URI,
  OIDC_RESPONSE_TYPE,
} from '@/core/config';
import { AppDataSource } from '@/core/database';
import { Routes } from '@/core/interfaces/routes.interface';
import { ErrorMiddleware } from '@/core/middlewares/error.middleware';
import { logger, stream } from '@/core/utils/logger';
import session from 'express-session';
import { Issuer } from 'openid-client';
import { OpenIDClientManager } from './core/utils/openid-client-manager';

export class App {
  public env: string;
  public port: string | number;

  public app: express.Application;
  public oidc: OpenIDClientManager;

  constructor(routes: Routes[]) {
    this.port = PORT || 3000;
    this.env = NODE_ENV || 'development';
    this.app = express();
    this.oidc = new OpenIDClientManager();

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen = () => {
    this.app.listen(this.port, () => {
      logger.info(`
┌──────────────────────────────────┐
│        🚀 Server Started         │
├──────────────────────────────────┤
│ ENV: ${NODE_ENV}                 │
│ Port: ${PORT}                       │
└──────────────────────────────────┘
`);
    });
  };

  public getServer = () => {
    return this.app;
  };

  private connectToDatabase = async () => {
    await AppDataSource.initialize()
      .then(() => {
        logger.info(`
┌──────────────────────────────────┐
│    🚀 Connected to postgresql    │
└──────────────────────────────────┘
`);
      })
      .catch(() => {
        logger.error(`
┌──────────────────────────────────┐
│ [X] Error connecting to postgres │
└──────────────────────────────────┘
`);
      });
  };

  private initializeMiddlewares = () => {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(
      session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: true,
          httpOnly: true,
          maxAge: 1000 * 60 * 60, // 1 hour,
        },
      }),
    );
  };

  private initializeRoutes = (routes: Routes[]) => {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  };

  private initializeErrorHandling = () => {
    this.app.use(ErrorMiddleware);
  };
}

//https://chat.openai.com/share/67b4e780-4178-41e6-8c24-a4eaee202812
