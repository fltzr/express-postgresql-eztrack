import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public lastname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  public phone: string;

  @IsDateString()
  @IsNotEmpty()
  public birthdate: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['male', 'female', 'other', 'prefer not to say'])
  public gender: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public address1: string;

  @IsString()
  @MinLength(3)
  @MaxLength(32)
  public address2: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public city: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public state: string;

  @IsNotEmpty()
  public zipcode: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public country: string;
}

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}
