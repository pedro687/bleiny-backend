import { Request, Response } from 'express';
import CreateUserService from '@modules/user/services/CreateUserService';
import FindUsersService from '@modules/user/services/FindUsersService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      username,
      full_name,
      age,
      password,
      email,
      UF,
      city,
      cpf,
      isInfluencer,
    } = req.body;

    if (
      !username ||
      !UF ||
      !full_name ||
      !age ||
      !password ||
      !email ||
      !UF ||
      !city ||
      !isInfluencer
    ) {
      return res.status(401).json({ error: 'Have empty fields! Try again.' });
    }

    const createUser = container.resolve(CreateUserService);

    const createdUser = await createUser.execute({
      username,
      full_name,
      age,
      password,
      email,
      UF,
      city,
      cpf,
      isInfluencer,
    });

    return res.status(200).json(classToClass(createdUser));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const findedUsers = container.resolve(FindUsersService);

    const findUsers = await findedUsers.execute();

    return res.status(200).json(classToClass(findUsers));
  }
}
