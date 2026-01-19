import express from 'express';
import * as postsController from "../controllers/postsController.js";
const postsRouter = express.Router();

postsRouter.get("/", postsController.sendPosts); // all posts
postsRouter.get("/count", postsController.sendNumberOfPosts); // number of posts has to go first or id will trigger and break things
postsRouter.get("/:id", postsController.sendPost); // one post

postsRouter.get("/:id/comments", postsController.sendComments);
postsRouter.get("/users/:id", postsController.sendUsersPosts); // all posts by user

postsRouter.post("/", postsController.postPost);
postsRouter.post("/:id/comments", postsController.postComment);

postsRouter.delete("/:id" ,postsController.deletePost)
postsRouter.delete("/:id/comments/:commentId", postsController.deleteComment);

postsRouter.patch("/:id/publish", postsController.togglePublishPost);
postsRouter.patch("/:id/edit", postsController.updatePost);

export { postsRouter };