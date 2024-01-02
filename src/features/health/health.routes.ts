import { Router, Request, Response, NextFunction } from 'express';
import { Routes } from '@/core/interfaces/routes.interface';

export class HealthRoutes implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(
      '/health-check',
      (_request: Request, response: Response, next: NextFunction) => {
        response.status(200).send('OK');
      },
    );
  };
}
