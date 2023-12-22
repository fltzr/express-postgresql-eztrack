import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBudgetItemDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public value: string;

  @IsString()
  @IsNotEmpty()
  public category: string;
}
