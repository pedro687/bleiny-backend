import { Repository, getRepository } from 'typeorm';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import Users from '@modules/user/infra/typeorm/entities/Users';

import ICreateUserDTO from '@modules/user/DTOs/ICreateUserDTO';

export default class UserRepository implements IUserRepository {
  private ormConfig: Repository<Users>;

  constructor() {
    this.ormConfig = getRepository(Users);
  }

  public async create({
    username,
    full_name,
    age,
    password,
    email,
    UF,
    city,
    isInfluencer,
  }: ICreateUserDTO): Promise<Users | undefined> {
    const createdUser = this.ormConfig.create({
      username,
      full_name,
      age,
      password,
      email,
      UF,
      city,
      isInfluencer,
    });

    await this.ormConfig.save(createdUser);

    return createdUser;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const verifyEmail = await this.ormConfig.findOne({ where: { email: email } });

    return verifyEmail;
  }

  public async save(user: Users): Promise<Users> {
    return this.ormConfig.save(user);
  }
}
