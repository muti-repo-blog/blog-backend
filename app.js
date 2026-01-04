import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeOne } from "./routes/routeOne.js";
import { routeTwo } from "./routes/routeTwo.js";
import { routeThree } from "./routes/routeThree.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", routeOne);
app.use("/two", routeTwo);
app.use("/three", routeThree);
app.get('/{*splat}', (req, res, next) => {
  const err = new Error(`Page not found: ${req.originalUrl}`);
  err.statusCode = 404
  next(err)
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).render('error', { title: 'Error', error: err});
});
