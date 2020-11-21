import { Router } from 'express';

import UsersController from '@modules/user/infra/http/controllers/UserController';
import ensureAuthenticated from '@modules/user/middlewares/ensureAuthenticated';

const UserController = new UsersController();
const usersRouter = Router();

usersRouter.post('/', UserController.create);
usersRouter.get('/', ensureAuthenticated, UserController.index);

export default usersRouter;
