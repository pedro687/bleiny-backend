import "reflect-metadata";
import { container, inject, injectable } from 'tsyringe';
import Users from '@modules/user/infra/typeorm/entities/Users';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import IFindAllUsersDTO from '../DTOs/IFindAllUsers';

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

  public async execute({ except_user_id }: IFindAllUsersDTO): Promise<Array<Users>> {
    const findUsers = await this.usersRepository.findAll({except_user_id: except_user_id});

    if (!findUsers) {
      throw new AppError('No users found', 401);
    }

    return findUsers;
  }
}
