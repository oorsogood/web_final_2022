import { Router } from "express";
import PostRouter from "./post";
import AuthRouter from "./authRoutes";
import UserRouter from "./userRoutes";

export default {
  routes: PostRouter,
  auth_routes: AuthRouter,
  user_routes: UserRouter,
};
