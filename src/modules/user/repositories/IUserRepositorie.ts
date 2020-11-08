import Users from '@modules/user/infra/typeorm/entities/Users';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';

export default interface IUserRepositorie {
  create({
    username,
    full_name,
    age,
    password,
    email,
    UF,
    city,
    cpf,
    isInfluencer,
  }: ICreateUserDTO): Promise<Users | undefined>;

  findById(id: string): Promise<Users | undefined>;

  findAll(): Promise<Array<Users> | undefined>;

  remove(user: Users): Promise<Users>;

  save(user: Users): Promise<Users>;

  findByEmail(email: string): Promise<Users | undefined>;

  findByUsername(username: string): Promise<Users | undefined>;

}
