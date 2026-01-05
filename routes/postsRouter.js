import express from 'express';
import * as postsController from "../controllers/postsController.js";
const postsRouter = express.Router();

postsRouter.get("/", postsController.renderIndex);

export { postsRouter };