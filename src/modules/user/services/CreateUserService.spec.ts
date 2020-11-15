import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  test('Should return 400 if email already exists ', async () => {
    const fakeUser = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUser);

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

    expect(
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
    ).rejects.toBeInstanceOf(AppError)
  });
});
