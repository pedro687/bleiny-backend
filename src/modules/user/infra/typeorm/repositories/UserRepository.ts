import { Repository, getRepository, Not } from 'typeorm';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import Users from '@modules/user/infra/typeorm/entities/Users';

import ICreateUserDTO from '@modules/user/DTOs/ICreateUserDTO';
import IFindAllUsersDTO from '@modules/user/DTOs/IFindAllUsers';

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

  public async findByUsername(username: string): Promise<Users | undefined> {
    const verifyUsername = await this.ormConfig.findOne({ where: { username: username } });

    return verifyUsername;
  }

  public async findAll({ except_user_id }: IFindAllUsersDTO): Promise<Users[] | undefined> {
    let users: Users[];

    if (except_user_id) {
      users = await this.ormConfig.find({
        where: {
          id: Not(except_user_id)
        }
      })
    } else {
      users = await this.ormConfig.find();
    }

    return users;
  }

  public async save(user: Users): Promise<Users> {
    return this.ormConfig.save(user);
  }
}
