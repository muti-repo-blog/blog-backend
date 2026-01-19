import express from 'express';
import * as indexController from "../controllers/indexController.js";
const indexRouter = express.Router();

indexRouter.get("/", indexController.sendFeatured);
indexRouter.get("/users", indexController.sendUsers);
indexRouter.get("/users/count", indexController.sendNumberOfUsers);

indexRouter.delete("/users/:id", indexController.deleteUser);

export { indexRouter };