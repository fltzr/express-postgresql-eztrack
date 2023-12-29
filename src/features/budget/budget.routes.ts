import { Router } from 'express';
import { ValidationMiddleware } from '@/core/middlewares/validation.middleware';
import { AuthMiddleware } from '@/features/auth/auth.middleware';
import { Routes } from '@/core/interfaces/routes.interface';
import { CreateBudgetItemDto } from './budget.dto';
import { BudgetItemController } from './budget.controller';

export class BudgetRoute implements Routes {
  public path = '/bank';
  public router = Router();
  public budget = new BudgetItemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .get(
        `${this.path}/budget-item/fetch`,
        AuthMiddleware,
        this.budget.fetchBudgetItems,
      )
      .post(
        `${this.path}/budget-item/create`,
        AuthMiddleware,
        ValidationMiddleware(CreateBudgetItemDto),
        this.budget.createBudgetItem,
      )
      .delete(
        `${this.path}/budget-item/delete/:id`,
        AuthMiddleware,
        this.budget.deleteBudgetItem,
      );
  };
}
