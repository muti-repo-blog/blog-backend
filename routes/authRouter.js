import express from 'express';
import * as authController from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.get("/", authController.renderIndex);
authRouter.post('/signup', authController.signupUser)
authRouter.post('/login', authController.loginUser)
authRouter.post('/login/admin', authController.loginAdmin)


export { authRouter };