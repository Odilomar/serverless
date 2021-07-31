import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserArgs, FindUserArgs } from './user.args';
import { DEFAULT_SKIP, DEFAULT_TAKE, UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() args: FindUserArgs) {
    return this.userService.find({
      take: args.take || DEFAULT_TAKE,
      skip: args.skip || DEFAULT_SKIP,
      ...args,
    });
  }

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
