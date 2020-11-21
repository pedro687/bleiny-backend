import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import HashProvider from './HashProvider/implementations/BCryptHash';

container.registerSingleton<IHashProvider>(
  'HashProvider',
  HashProvider,
)
