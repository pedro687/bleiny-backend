import { Request, Response } from 'express';
import CreateUserService from '@modules/user/services/CreateUserService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
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

      return res.status(200).json(classToClass(createdUser));
    }
  }
}
