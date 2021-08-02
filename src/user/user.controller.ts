import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserArgs, FindUserArgs, UpdateUserArgs } from './user.args';
import { DEFAULT_SKIP, DEFAULT_TAKE, UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() args?: FindUserArgs) {
    return this.userService.find(args);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne({ id });
  }

  @HttpCode(201)
  @Post()
  async create(@Body() user: CreateUserArgs) {
    return this.userService.create(user);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() args: UpdateUserArgs,
  ) {
    return this.userService.update(id, args);
  }

  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
