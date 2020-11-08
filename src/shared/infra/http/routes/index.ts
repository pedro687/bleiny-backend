import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello world');
})

export default router;
