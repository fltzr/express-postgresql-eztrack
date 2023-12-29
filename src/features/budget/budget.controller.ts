import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { BudgetService } from './budget.service';
import { BudgetItem } from './budget.interfaces';
import { RequestWithUser } from '../auth/auth.types';

export class BudgetItemController {
  public budget = Container.get(BudgetService);

  public createBudgetItem = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const budgetItemData: BudgetItem = {
        ...request.body.item,
        userId: request.user.id,
      };
      const budgetItem = await this.budget.createBudgetItem(budgetItemData);

      response
        .status(200)
        .json({ item: budgetItem, message: 'createBudgetItem' });
    } catch (error) {
      next(error);
    }
  };

  public fetchBudgetItems = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const budgetItems = await this.budget.fetchBudgetItems();

      response
        .status(200)
        .json({ items: budgetItems, message: 'fetchBudgetItems' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBudgetItem = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const budgetItemId = Number(request.params.id);
      await this.budget.deleteBudgetItem(budgetItemId);

      response.status(200);
    } catch (error) {
      next(error);
    }
  };
}
