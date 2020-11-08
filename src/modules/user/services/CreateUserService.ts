import { inject, injectable } from 'tsyringe';
import Users from '@modules/user/infra/typeorm/entities/Users';
import { hash } from 'bcryptjs';

//global exception
import AppError from '@shared/errors/AppError';

//interfaces
import IUserRepository from '@modules/user/repositories/IUserRepositorie';

interface IRequest {
  username: string;
  full_name: string;
  age: number;
  password: string;
  email: string;
  UF: string;
  city: string;
  cpf?: string;
  isInfluencer: boolean;
}

@injectable()
export default class CreateUserService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UsersRepository')
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({
    username,
    full_name,
    age,
    password,
    email,
    UF,
    city,
    cpf,
    isInfluencer,
  }: IRequest): Promise<Users> {

    const verifyEmail = await this.userRepository.findByEmail(email);

    if (verifyEmail) {
      throw new AppError('This email already exists!');
    }

    const verifyUsername = await this.userRepository.findByUsername(username);

    if (verifyUsername) {
      throw new AppError('This username already exists!');
    }

    const passwordHash = await hash(password, 8);
    const createdUser = await this.userRepository.create({
      username,
      full_name,
      age,
      password: passwordHash,
      email,
      UF,
      city,
      cpf,
      isInfluencer,
    });

    if (!createdUser) {
      throw new AppError('Error, try again later!');
    }

    return createdUser;
  }
}
