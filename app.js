import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authRouter } from "./routes/authRouter.js";
import { indexRouter } from "./routes/indexRouter.js";
import { postsRouter } from './routes/postsRouter.js';
import { authApp } from './lib/auth.js';
import passport from 'passport';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authApp)

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use("/posts", passport.authenticate('jwt', { session: false }), postsRouter);

app.get('/{*splat}', (req, res, next) => {
  const err = new Error(`Page not found: ${req.originalUrl}`);
  err.statusCode = 404
  next(err)
});

app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My Express app - listening on port ${process.env.PORT}!`);
});
