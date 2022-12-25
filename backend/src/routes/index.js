import { Router } from 'express';
import PostRouter from './post';

const router = Router();
router.use('/', PostRouter);

export default router;