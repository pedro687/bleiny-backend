import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUser: FakeUserRepository;
let authenticate: AuthenticateUserService;
let fakeHash: FakeHashProvider;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUser = new FakeUserRepository();
    fakeHash = new FakeHashProvider();
    authenticate = new AuthenticateUserService(fakeUser, fakeHash);
    createUser = new CreateUserService(fakeUser, fakeHash);
  });

  test('should be able to authenticate ', async () => {
    const create = await createUser.execute({
      UF: 'SP',
      age: 14,
      city: 'Itanhaém',
      email: 'JonDoe@mail.com',
      full_name: 'Jon Doe',
      isInfluencer: false,
      password: '12345',
      username: 'Jon Doe',
    });

    const verifyAuth = await authenticate.execute({
      username: 'Jon Doe',
      password: '12345',
    });

    expect(verifyAuth).toHaveProperty('token');
  });
});
