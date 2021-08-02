import { DefaultValuePipe } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserORM } from './user.entity';

type User = Omit<UserORM, 'updated_at' | 'created_at'>;

export class CreateUserArgs {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  idade: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cargo: string;
}

export class UpdateUserArgs {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  idade: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cargo: string;
}

export class FindUserArgs extends UpdateUserArgs {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip: number;
}
