import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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

export default {
  signup: async (req, res, next) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            user.roles = roles.map((role) => role._id);
            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  },

  signin: async (req, res, next) => {
    console.log("signing in!");
    await User.findOne({
      username: req.body.username,
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          console.log("user not found.");
          return res.status(404).send({ message: "User Not found." });
        }
        if (!req.session) {
          console.log("no req session");
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({ message: "Invalid Password!" });
        }

        var token = jwt.sign({ id: user.id }, SECRETKEY, {
          expiresIn: 86400, // 24 hours
        });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }

        req.session.token = token;

        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
  },

  signout: async (req, res, next) => {
    try {
      console.log("You've been signed out!");
      req.session = null;
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
      this.next(err);
    }
  },
};
