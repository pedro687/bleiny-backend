import { Request, Response } from 'express';
import CreateUserService from '@modules/user/services/CreateUserService';
import FindUsersService from '@modules/user/services/FindUsersService';
import FindUserService from '@modules/user/services/FindUsersService';
import RemoveUserService from '@modules/user/services/RemoveUserService';
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

    return await createUser
      .execute({
        username,
        full_name,
        age,
        password,
        email,
        UF,
        city,
        cpf,
        isInfluencer,
      })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(403).json(err));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const findedUsers = container.resolve(FindUsersService);

    const findUsers = await findedUsers.execute();

    return res.status(200).json(classToClass(findUsers));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ message: 'parameter not found' });
    }

    const findedUser = container.resolve(FindUserService);

    const findUser = await findedUser.execute();

    return res.status(200).json(classToClass(findUser));
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    if (!id) {
      return res.status(401).json({ message: 'parameter not found' });
    }

    const removeUser = container.resolve(RemoveUserService);

    const removedUser = await removeUser.execute(id);

    return res.status(200).json(classToClass(removedUser));
  }
}
