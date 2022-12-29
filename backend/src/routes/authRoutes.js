import verifySignUp from "../middlewares/verifySignUp";
import { Router } from "express";
import controller from "../controllers/authController";

const router = Router();

console.log("hi auth");

// router.use((req, res, next) => {
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, Content-Type, Accept"
//     );
//     next();
// });

// console.log(controller);

router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

router.post("/signin", controller.signin);

router.post("/signout", controller.signout);

export default router;