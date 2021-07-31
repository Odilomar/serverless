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
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {}

  @Get('/:id')
  async findOne() {}

  @Post()
  async create(@Body() user: CreateUserArgs) {
    console.log({ user });
    return this.userService.create(user);
  }

  @Put('/:id')
  async update() {}

  @Delete('/:id')
  async delete() {}
}
