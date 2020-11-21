import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';
import IUserRepository from '../repositories/IUserRepository';
import Users from '@modules/user/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreateUserService {
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

  public async execute({
    username,
    full_name,
    age,
    password,
    email,
    UF,
    city,
    isInfluencer,
  }: ICreateUserDTO): Promise<Users | undefined> {
    const verifyEmail = await this.usersRepository.findByEmail(email);

    if (verifyEmail) {
      throw new AppError('That email already exists', 400);
    }

    const verifyUsername = await this.usersRepository.findByUsername(username);

    if (verifyUsername) {
      throw new AppError('That username already exists', 400);
    }

    const passwordHash = await this.hashProvider.generateHash(password);
    const createdUser = await this.usersRepository.create({
      username,
      full_name,
      age,
      password: passwordHash,
      email,
      UF,
      city,
      isInfluencer,
    });

    if (!createdUser) {
      throw new AppError('Error, try again later!', 403);
    }

    return createdUser;
  }
}
