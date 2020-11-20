import FindUsersService from './FindUsersService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

let fakeUserRepository: FakeUserRepository;
let findUserService: FindUsersService;

describe('FindUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    findUserService = new FindUsersService(fakeUserRepository);
  });

  test('Should be able to list the users', async () => {
    const loggedUser = await fakeUserRepository.create({
      UF: 'SP',
      age: 11,
      city: 'Guarujá',
      email: 'Pedro@mail.com',
      full_name: 'Pedro Emanoel do Nascimento',
      isInfluencer: false,
      password: '12345',
      username: 'Renato Gaucho',
    });

    const user1 = await fakeUserRepository.create({
      UF: 'SP',
      age: 14,
      city: 'Itanhaém',
      email: 'JonDoe@mail.com',
      full_name: 'Jon Doe',
      isInfluencer: false,
      password: '12345',
      username: 'Jon Doe',
    });

    const user2 = await fakeUserRepository.create({
      UF: 'SP',
      age: 15,
      city: 'Santos',
      email: 'JonTre@mail.com',
      full_name: 'Jon tre',
      isInfluencer: false,
      password: '12345',
      username: 'Jon Tre',
    });

    const profile = await findUserService.execute({
      except_user_id: loggedUser?.id,
    });

    expect(profile).toEqual([
      user1, user2
    ])
  });
});
