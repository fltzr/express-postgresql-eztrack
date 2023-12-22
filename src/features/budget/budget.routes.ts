import { Router } from 'express';
import { ValidationMiddleware } from '@/core/middlewares/validation.middleware';
import { AuthMiddleware } from '@/features/auth/auth.middleware';
import { Routes } from '@/core/interfaces/routes.interface';
import { CreateBudgetItemDto } from './budget.dto';
import { BudgetItemController } from './budget.controller';

export class BudgetRoute implements Routes {
  public path = '/budget';
  public router = Router();
  public budget = new BudgetItemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}/budget-item/create`, AuthMiddleware, ValidationMiddleware(CreateBudgetItemDto), this.budget.createBudgetItem);
  };
}
