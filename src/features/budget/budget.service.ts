import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { BudgetItemEntity } from './budget.entity';
import { BudgetItem } from './budget.interfaces';

@Service()
export class BudgetService extends Repository<BudgetItemEntity> {
  public async createBudgetItem(budgetItemData: BudgetItem) {
    const budgetItem = await BudgetItemEntity.create({
      ...budgetItemData,
    }).save();

    return budgetItem;
  }

  public async fetchBudgetItems() {
    const budgetItems = await BudgetItemEntity.find({ relations: ['user'] });

    return budgetItems;
  }

  public async deleteBudgetItem(budgetItemId: number) {
    await BudgetItemEntity.delete(budgetItemId);
  }
}
