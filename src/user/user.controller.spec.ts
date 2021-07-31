import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = {
        data: [
          {
            id: 1,
            name: 'Odilomar',
            idade: 24,
            cargo: 'Programador',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        total: 1,
        take: 5,
        skip: 0,
      };
      jest.spyOn(userService, 'find').mockResolvedValue(result);

      expect(await userController.findAll()).toBe(result);
    });
  });
});
