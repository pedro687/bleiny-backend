import { container } from 'tsyringe';
import '@modules/user/providers/index';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
