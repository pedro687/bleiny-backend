import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const SessionController = new SessionsController();
const SessionsRouter = Router();

SessionsRouter.post('/', SessionController.create);

export default SessionsRouter;
