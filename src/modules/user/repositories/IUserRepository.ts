import Users from '@modules/user/infra/typeorm/entities/Users';
import ICreateUserDTO from '../DTOs/ICreateUserDTO';
import IFindAllUsersDTO from '../DTOs/IFindAllUsers';
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

  findAll({ except_user_id }: IFindAllUsersDTO): Promise<Users[] | undefined>;

  save(user: Users): Promise<Users>;

  findByUsername(username: string): Promise<Users | undefined>;

  findById(id: string): Promise<Users | undefined>;
  }
