import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import to from 'await-to-js';
import { FindConditions, ObjectLiteral, Repository } from 'typeorm';
import { CreateUserArgs, FindUserArgs } from './user.args';
import { UserORM } from './user.entity';

export const DEFAULT_TAKE = 5;
export const DEFAULT_SKIP = 0;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserORM)
    private readonly userRepository: Repository<UserORM>,
  ) {}

  async create(args: CreateUserArgs) {
    const user = this.userRepository.create({ ...args });

    const [userError, userStored] = await to(this.userRepository.save(user));
    if (!!userError)
      throw new InternalServerErrorException(
        `User was not saved. Details: ${userError}`,
      );

    return userStored;
  }

  async findOne(
    where?:
      | string
      | ObjectLiteral
      | FindConditions<UserORM>
      | FindConditions<UserORM>[],
  ) {
    return this.userRepository.findOne({ where });
  }

  async find({ take, skip, ...args }: FindUserArgs) {
    const keys = Object.keys(args);
    const where = await Promise.all(
      keys.map((key) => JSON.parse(`{ "${key}": "${args[key]}" }`)),
    );
    const [users, total] = await this.userRepository.findAndCount({
      where,
      take,
      skip,
    });

    return {
      data: users,
      total,
      take,
      skip,
    };
  }
}
