import express from 'express';
import * as postsController from "../controllers/postsController.js";
const postsRouter = express.Router();

postsRouter.get("/", postsController.sendPosts); // all posts
postsRouter.get("/:id", postsController.sendPost); // one post

postsRouter.get("/:id/comments", postsController.sendComments); // all comments for one post
// postsRouter.get("/:postId/comments/:commentId", postsController.sendComment); // one comment for one post

postsRouter.post("/:id/comments", postsController.postComment);

export { postsRouter };