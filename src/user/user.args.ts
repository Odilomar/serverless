import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserArgs {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  idade: number;

  @IsNotEmpty()
  @IsString()
  cargo: string;
}
