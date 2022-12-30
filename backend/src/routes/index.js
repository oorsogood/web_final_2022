import { Router } from 'express';
import PostRouter from './post';
import AuthRouter from './authRoutes';
import UserRouter from './userRoutes';

// const router = Router();
// router.use('/', PostRouter);

// const auth_router = Router();
// auth_router.use('/api/auth', AuthRouter);

// const user_router = Router();
// user_router.use('/api/test', UserRouter);

export default {
    routes: PostRouter,
    auth_routes: AuthRouter,
    user_routes: UserRouter
};