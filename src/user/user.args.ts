import { DefaultValuePipe } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserORM } from './user.entity';

type User = Omit<UserORM, 'updated_at' | 'created_at'>;

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

export class FindUserArgs {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  idade: number;

  @IsOptional()
  @IsString()
  cargo: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip: number;
}
