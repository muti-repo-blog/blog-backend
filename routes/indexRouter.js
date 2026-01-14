import express from 'express';
import * as indexController from "../controllers/indexController.js";
const indexRouter = express.Router();

indexRouter.get("/", indexController.sendFeatured);
indexRouter.get("/users/count", indexController.sendNumberOfUsers);

export { indexRouter };