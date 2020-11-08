import { Router } from 'express';

import UsersController from '@modules/user/infra/http/controllers/UserController';

const UserController = new UsersController();
const usersRouter = Router();

usersRouter.post('/', UserController.create);

export default usersRouter;
