import express  from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import config from './config/config.js'
import authRouter from './routers/authRouter.js'

const app = express();
const port = config.port || 5000

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());

app.use(authRouter)

app.listen(port, console.log(`Server is running on http://localhost:${port}`));

