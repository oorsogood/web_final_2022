import express from "express";
import cors from "cors";
import db from "./mongo";
const session = require("express-session");
import PostRouter from "./routes/post";
import AuthRouter from "./routes/authRoutes";
import UserRouter from "./routes/userRoutes";

const app = express();
const port = process.env.PORT || 8080;

db.connect();
db.initial();

app.use(cors());
app.use(express.json());

// store data in cookieSession
app.use(
  session({
    name: "session",
    secret: "MY_COOKIE_SECRET", // should use as secret environment variable
  })
);

app.use("/api/auth", AuthRouter);
app.use("/api/test", UserRouter);
app.use("/", PostRouter);

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
