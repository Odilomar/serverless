import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserArgs {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  idade: number;

  @IsNotEmpty()
  @IsString()
  cargo: string;
}
