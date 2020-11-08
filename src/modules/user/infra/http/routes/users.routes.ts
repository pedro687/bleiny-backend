import { Router } from 'express';

import UsersController from '@modules/user/infra/http/controllers/UserController';

const UserController = new UsersController();
const usersRouter = Router();

usersRouter.post('/', UserController.create);
usersRouter.get('/', UserController.index);
usersRouter.get('/:id', UserController.show);
usersRouter.delete('/', UserController.remove);

export default usersRouter;
