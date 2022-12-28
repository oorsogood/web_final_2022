// const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

const router = Router();

router.get("/api/test/all", controller.allAccess);

router.get("/api/test/user",
    // [authJwt.verifyToken],
    controller.userBoard
);

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user",
        // [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/admin",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};

export default 