import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserArgs } from './user.args';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {}

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne({ id });
  }

  @Post()
  async create(@Body() user: CreateUserArgs) {
    return this.userService.create(user);
  }

  @Put('/:id')
  async update() {}

  @Delete('/:id')
  async delete() {}
}
