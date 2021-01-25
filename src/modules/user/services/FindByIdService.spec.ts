import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FindByIdService from './findByIdService';

let fakeUser: FakeUserRepository;
let fakeHash: FakeHashProvider;
let createdUser: CreateUserService;
let authenticate: AuthenticateUserService;
let findById: FindByIdService;

describe('Show profiles test', () => {
  beforeEach(() => {
    fakeUser = new FakeUserRepository();
    fakeHash = new FakeHashProvider();
    createdUser = new CreateUserService(fakeUser, fakeHash);
    authenticate = new AuthenticateUserService(fakeUser, fakeHash);
    findById = new FindByIdService(fakeUser);
  });

  test('Should return my profile if iam logged', async () => {
    const user1 = await createdUser.execute({
      UF: 'SP',
      age: 18,
      city: 'Itanhaém',
      email: 'Pedro@email.com',
      full_name: 'Pedro Emanoel',
      isInfluencer: false,
      password: '12345',
      username: 'Pedro',
    });

    const verifyUser = await authenticate.execute({
      username: 'Pedro',
      password: '12345',
    });

    expect(verifyUser).toHaveProperty("token");

    const profile = await findById.execute(user1?.id);
    expect(profile).toEqual(user1);
  });
});
