import Users from '@modules/user/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';

export default interface IUserRepository {
  create({
    username,
    full_name,
    age,
    password,
    email,
    UF,
    city,
    isInfluencer,
  }: ICreateUserDTO): Promise<Users | undefined>;

  findByEmail(email: string): Promise<Users | undefined>;

  findAll(): Promise<Array<Users | undefined>>;

  save(user: Users): Promise<Users>;

  findByUsername(username: string): Promise<Users | undefined>;

}
