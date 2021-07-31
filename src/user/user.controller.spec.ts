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
    it('should return an array of users', async () => {
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

  describe('create', () => {
    it('should create a user', async () => {
      const result = {
        id: 1,
        name: "Odilomar",
        idade: 24,
        cargo: "Programador",
        created_at: new Date,
        updated_at: new Date,
      }
      jest.spyOn(userService, 'create').mockResolvedValue(result);

      expect(await userController.create(result)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      const result = {
        id: 1,
        name: "Odilomar",
        idade: 24,
        cargo: "Programador",
        created_at: new Date,
        updated_at: new Date,
      }
      jest.spyOn(userService, 'findOne').mockResolvedValue(result);

      expect(await userController.findOne(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result = {
        id: 1,
        name: "Odilomar",
        idade: 24,
        cargo: "Programador",
        created_at: new Date,
        updated_at: new Date,
      }      
      jest.spyOn(userService, 'update').mockResolvedValue(result);

      expect(await userController.update(result.id, { ...result })).toBe(result);
    });
  });

  // describe('delete', () => {
  //   it('should return an array of users', async () => {
  //     const result = {}
  //     jest.spyOn(userService, 'find').mockResolvedValue(result);

  //     expect(await userController.findAll()).toBe(result);
  //   });
  // });
});
