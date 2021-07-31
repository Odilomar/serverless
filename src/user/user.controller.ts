import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserArgs } from './user.args';

@Controller('user')
export class UserController {
  @Get()
  async findAll() {}

  @Get('/:id')
  async findOne() {}

  @Post()
  async create(@Body() user: CreateUserArgs) {}

  @Put('/:id')
  async update() {}

  @Delete('/:id')
  async delete() {}
}
