import { Router } from 'express';
import UsersRouter from '@modules/user/infra/http/routes/users.routes';
import SessionsRouter from '@modules/user/infra/http/routes/sessions.routes';

const router = Router();

router.use('/users', UsersRouter);
router.use('/session', SessionsRouter)

export default router;
