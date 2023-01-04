import mongoose from "mongoose";
import dotenv from "dotenv-defaults";

import db from "./models";
const Role = db.role;
const User = db.user;

export default {
  connect: () => {
    dotenv.config();
    if (!process.env.MONGO_URL) {
      console.error("Missing MONGO_URL!!!");
      process.exit(1);
    }

    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => {
        console.log("Mongo db connection created!");
      });

    mongoose.connection.on(
      "error",
      console.error.bind(console, "connection error:")
    );
  },
  // add role and count
  initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'user' to roles collection");
        });

        new Role({
          name: "moderator",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'moderator' to roles collection");
        });

        new Role({
          name: "admin",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'admin' to roles collection");
        });
      }
    });
  },
};
