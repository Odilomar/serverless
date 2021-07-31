import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserORM } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserORM)
        private readonly userRepository: Repository<UserORM>,
    ) {}
}
