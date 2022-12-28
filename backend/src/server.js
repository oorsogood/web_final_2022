import express from 'express';
import cors from 'cors';
import db from './mongo';
// import {routes, auth_routes, user_routes} from './routes';
import PostRouter from './routes/post';
import AuthRouter from './routes/authRoutes';
import UserRouter from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 8080;

var corsOptions = {
    origin: "http://localhost:8081"
};

db.connect();
db.initial();
app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());

app.use('/api/auth', AuthRouter);
app.use('/api/test', UserRouter);
app.use('/', PostRouter);

app.listen(port, () =>
	console.log(`App listening on port ${port}!`),
);