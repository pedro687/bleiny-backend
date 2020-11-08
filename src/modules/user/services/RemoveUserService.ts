import { inject, injectable } from 'tsyringe';
import Users from '@modules/user/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/user/repositories/IUserRepositorie';
import AppError from '@shared/errors/AppError';

@injectable()
export default class RemoveUserService {
  private userRepository: IUsersRepository;

  constructor (
    @inject('UsersRepository')
    userRepository: IUsersRepository,
  )
  {
    this.userRepository = userRepository;
  }

  public async execute(user: Users): Promise<Users> {
    const findUser = await this.userRepository.findById(user.id);

    if (!findUser) {
      throw new AppError('This user doenst exist!', 403);
    }

    const removeUser = await this.userRepository.remove(findUser);

    return removeUser;
  }
}
