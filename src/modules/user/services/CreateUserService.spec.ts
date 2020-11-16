import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUserRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      UF: 'SP',
      age: 11,
      city: 'Guarujá',
      email: 'Pedro@mail.com',
      full_name: 'Pedro Emanoel do Nascimento',
      isInfluencer: false,
      password: '12345',
      username: 'Renato Gaucho',
    });

    expect(user).toHaveProperty('id');
  });

  it('should NOT be able to create a two users with same email', async () => {
    await createUser.execute({
      UF: 'SP',
      age: 11,
      city: 'Guarujá',
      email: 'Pedro@mail.com',
      full_name: 'Pedro Emanoel do Nascimento',
      isInfluencer: false,
      password: '12345',
      username: 'Renato Gaucho',
    });

    await expect(
      createUser.execute({
        UF: 'SP',
        age: 11,
        city: 'Guarujá',
        email: 'Pedro@mail.com',
        full_name: 'Pedro Emanoel do Nascimento',
        isInfluencer: false,
        password: '12345',
        username: 'Renato Gaucho',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
