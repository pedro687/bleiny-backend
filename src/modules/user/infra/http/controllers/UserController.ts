import { Request, Response } from 'express';
import CreateUserService from '@modules/user/services/CreateUserService';
import FindUsersService from '@modules/user/services/FindUsersService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response | undefined> {
    const requiredFields = [
      'username',
      'full_name',
      'age',
      'password',
      'email',
      'UF',
      'city',
      'isInfluencer',
    ];

    for (const fields of requiredFields) {
      if (!req.body[fields]) {
        return res.status(400).json({
          message: 'have empty fields! try again.',
        });
      }

      const createUser = container.resolve(CreateUserService);

      const createdUser = await createUser.execute(req.body);

      if (!createdUser) {
        return res.status(400).json({
          message: 'Error! Try again later!',
        });
      }

      return res.status(200).json(classToClass(createdUser));
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.params.id;

    const findedUsers = container.resolve(FindUsersService);

    const findUsers = await findedUsers.execute(user_id);

    return res.status(200).json(classToClass(findUsers));
  }
}
