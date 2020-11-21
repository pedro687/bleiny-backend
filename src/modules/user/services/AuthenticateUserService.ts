import { inject, injectable } from 'tsyringe';
import Users from '../infra/typeorm/entities/Users';
import IUserRepository from '../repositories/IUserRepository';
import { compare } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import AuthConfig from '@config/Auth';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  username: string,
  password: string,
}

interface IResponse {
  user: Users,
  token: string
}

@injectable()
export default class AuthenticateUserService {
  private usersRepository: IUserRepository;
  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    userRepository: IUserRepository,

    @inject('HashProvider')
    HashProvider: IHashProvider,
  ) {
    this.usersRepository = userRepository;
    this.hashProvider = HashProvider;
  }

  public async execute({username, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(
      username,
    );

    if (!user) {
      throw new AppError(
        'Some information is incorrect, please try again!',
        400,
      );
    }

    const passwordCompare = await this.hashProvider.compareHash(password, user.password);

    if (!passwordCompare) {
      throw new AppError(
        'Some information is incorrect, please try again!',
        400,
      );
    }

    const userSub = {
      id: user.id,
      isInfluencer: user.isInfluencer,
      username: user.username,
    }

    const { secret, expiresIn } = AuthConfig.jwt;
    const token = sign({}, secret, {
      expiresIn,
      subject: JSON.stringify(userSub),
    });

    return {
      user,
      token,
    }
  }
}
