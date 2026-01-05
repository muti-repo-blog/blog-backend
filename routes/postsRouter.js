import express from 'express';
import * as postsController from "../controllers/postsController.js";
const postsRouter = express.Router();

postsRouter.get("/", postsController.sendPosts); // all posts
postsRouter.get("/:id", postsController.sendPost); // one post

export { postsRouter };