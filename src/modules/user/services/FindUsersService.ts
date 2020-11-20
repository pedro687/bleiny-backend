import { container, inject, injectable } from 'tsyringe';
import Users from '@modules/user/infra/typeorm/entities/Users';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindUsersService {
  private usersRepository: IUserRepository;

  constructor (
    @inject('UsersRepository')
    usersRepository: IUserRepository,
  )
  {
    this.usersRepository = usersRepository;
  }

  public async execute(user_id: string): Promise<Array<Users>> {
    const findUsers = await this.usersRepository.findAll({except_user_id: user_id});

    if (!findUsers) {
      throw new AppError('No users found', 401);
    }

    return findUsers;
  }
}
