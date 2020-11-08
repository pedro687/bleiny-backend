import { inject, injectable } from 'tsyringe';
import Users from '@modules/user/infra/typeorm/entities/Users';

import IUserRepository from '@modules/user/repositories/IUserRepositorie';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindUserService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UsersRepository')
    userRepository: IUserRepository,
  )
  {
    this.userRepository = userRepository;
  }

  public async execute(id: string): Promise<Users> {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) {
      throw new AppError('User doenst exist', 401);
    }

    return findUser;
  }
}
