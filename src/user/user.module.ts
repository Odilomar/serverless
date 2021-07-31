import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserORM } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserORM])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
