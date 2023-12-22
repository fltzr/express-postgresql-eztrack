import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { BudgetService } from './budget.service';
import { BudgetItem } from './budget.interfaces';

export class BudgetItemController {
  public budget = Container.get(BudgetService);

  public createBudgetItem = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const budgetItemData = request.body as BudgetItem;
      const budgetItem = await this.budget.createBudgetItem(budgetItemData);

      response.status(200).json({ data: budgetItem, message: 'createBudgetItem' });
    } catch (error) {
      next(error);
    }
  };
}
