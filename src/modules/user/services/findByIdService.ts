import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Users from '../infra/typeorm/entities/Users';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
export default class FindByIdService {
  private usersRepository: IUserRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUserRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute(id: string| undefined): Promise<Users | undefined > {
    if (!id) {
      throw new AppError('parameter not found', 401);
    }

    const verifyUser = this.usersRepository.findById(id);

    if (!verifyUser) {
      throw new AppError('User not found', 204);
    }

    return verifyUser;
  }
}
