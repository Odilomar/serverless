import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import to from 'await-to-js';
import { Repository } from 'typeorm';
import { CreateUserArgs } from './user.args';
import { UserORM } from './user.entity';

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
}
