import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@/core/config';
import { AppDataSource } from '@/core/database';
import { Routes } from '@/core/interfaces/routes.interface';
import { ErrorMiddleware } from '@/core/middlewares/error.middleware';
import { logger, stream } from '@/core/utils/logger';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
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
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
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
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
