import { Router } from 'express';
import UsersRouter from '@modules/user/infra/http/routes/users.routes';

const router = Router();

router.use('/users', UsersRouter);

export default router;
