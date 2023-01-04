import jwt from "jsonwebtoken";
import dotenv from "dotenv-defaults";
import db from "../models";

const User = db.user;
const Role = db.role;

dotenv.config();

if (!process.env.BCRYPT_SECRET_KEY) {
  console.error("Missing BCRYPT_SECRET_KEY!!!");
  process.exit(1);
}

const SECRETKEY = process.env.BCRYPT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  let token = req.body.token;
  console.log("verifying token");
  console.log(req.body);
  if (!token) {
    console.log("no token");
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  console.log(req.body);
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
};

export default authJwt;
