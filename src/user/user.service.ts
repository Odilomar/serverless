import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import to from 'await-to-js';
import { FindConditions, ObjectLiteral, Repository } from 'typeorm';
import { CreateUserArgs, FindUserArgs, UpdateUserArgs } from './user.args';
import {
  BODYISEMPTY,
  USERNOTFOUND,
  USERWASNOTDELETED,
  USERWASNOTSAVED,
} from './user.const';
import { UserORM } from './user.entity';

export const DEFAULT_TAKE = 5;
export const DEFAULT_SKIP = 0;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserORM)
    private readonly userRepository: Repository<UserORM>,
  ) {}

  private async save(user: UserORM) {
    const [userError, userStored] = await to(this.userRepository.save(user));
    if (!!userError)
      throw new InternalServerErrorException(
        `${USERWASNOTSAVED} Details: ${userError}`,
      );

    return userStored;
  }

  async create(args: CreateUserArgs) {
    return this.save(this.userRepository.create({ ...args }));
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
    const takeUser = Number(take || DEFAULT_TAKE);
    const skipUser = Number(skip || DEFAULT_SKIP);

    const keys = Object.keys(args);
    const where = await Promise.all(
      keys.map((key) => JSON.parse(`{ "${key}": "${args[key]}" }`)),
    );
    console.log({ where });
    const [users, total] = await this.userRepository.findAndCount({
      where,
      take: takeUser,
      skip: skipUser,
    });

    return {
      data: users,
      total,
      take: takeUser,
      skip: skipUser,
    };
  }

  async update(id: number, args: UpdateUserArgs) {
    if (Object.keys(args).length == 0)
      throw new BadRequestException(BODYISEMPTY);

    const user = await this.findOne({ id });
    if (!user) throw new NotFoundException(USERNOTFOUND);

    Object.assign(user, args);

    return this.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne({ id });
    if (!user) throw new NotFoundException(USERNOTFOUND);

    const [userErr] = await to(this.userRepository.delete({ id }));
    if (!!userErr)
      throw new InternalServerErrorException(
        `${USERWASNOTDELETED} Details: ${userErr}`,
      );
  }
}
