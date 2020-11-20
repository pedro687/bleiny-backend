import IUserRepository from '../IUserRepository';
import ICreateUserDTO from '@modules/user/DTOs/ICreateUserDTO';
import Users from '@modules/user/infra/typeorm/entities/Users';
import { uuid } from 'uuidv4';
import IFindAllUsersDTO from '@modules/user/DTOs/IFindAllUsers';

export default class FakeUserRepository implements IUserRepository{
  private users: Users[] = [];

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
    const users = new Users();

    users.UF = UF;
    users.age = age;
    users.city = city;
    users.email = email;
    users.full_name = full_name;
    users.isInfluencer = isInfluencer;
    users.password = password;
    users.username = username;
    users.id = uuid();

    this.users.push(users);

    return users;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findByUsername(username: string): Promise<Users | undefined> {
    const findUserName = this.users.find(user => user.username === username);

    return findUserName;
  }

  public async findAll({except_user_id}: IFindAllUsersDTO ): Promise<Users[] | undefined> {
    let users = this.users;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async save(user: Users): Promise<Users> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}
