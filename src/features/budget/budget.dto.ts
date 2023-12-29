import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class BudgetItemDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public value: number;

  @IsString()
  @IsNotEmpty()
  public category: string;
}

export class CreateBudgetItemDto {
  @IsObject()
  @IsNotEmpty()
  public item: BudgetItemDto;
}
