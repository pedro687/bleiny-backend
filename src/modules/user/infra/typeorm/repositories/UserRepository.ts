import { Repository, getRepository } from 'typeorm';

import IUserRepository from '@modules/user/repositories/IUserRepositorie';
import Users from '@modules/user/infra/typeorm/entities/Users';

import ICreateUserDTO from '@modules/user/DTOs/ICreateUserDTO';

export default class UserRepository implements IUserRepository{
  private ormConfig: Repository<Users>;

  constructor () {
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
    cpf,
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
      cpf,
      isInfluencer,
    });

    await this.ormConfig.save(createdUser);

    return createdUser;
  }

  public async save(user: Users): Promise<Users> {
    return this.ormConfig.save(user);
  }

  public async findById(id: string): Promise<Users | undefined> {
    const findUser = await this.ormConfig.findOne(id);

    return findUser;
  }

  public async findAll(): Promise<Array<Users> | undefined> {
    const findUsers = await this.ormConfig.find();

    return findUsers;
  }

  public async remove(user: Users): Promise<Users> {
    return await this.ormConfig.remove(user);
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const verifyEmail = await this.ormConfig.findOne({ where: { email: email } });

    return verifyEmail;
  }
  public async findByUsername(username: string): Promise<Users | undefined> {
    const verifyUsername = await this.ormConfig.findOne({ where: { username: username } });

    return verifyUsername;
  }
}
