import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';
import IUserRepository from '../repositories/IUserRepository';
import Users from '@modules/user/infra/typeorm/entities/Users';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateUserService {
  private usersRepository: IUserRepository;

  constructor(
    @inject('UsersRepository')
    userRepository: IUserRepository,
  ) {
    this.usersRepository = userRepository;
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

    const passwordHash = await hash(password, 8);
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
