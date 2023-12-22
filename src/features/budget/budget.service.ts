import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { BudgetItemEntity } from './budget.entity';
import { BudgetItem } from './budget.interfaces';

@Service()
export class BudgetService extends Repository<BudgetItemEntity> {
  public async createBudgetItem(budgetItemData: BudgetItem) {
    const createBudgetItemData = await BudgetItemEntity.create({ ...budgetItemData }).save();

    return createBudgetItemData;
  }
}
