import express from 'express';
import * as routeThreeController from "../controllers/controllerThree.js";
const routeThree = express.Router();

routeThree.get("/", routeThreeController.renderIndex);

export { routeThree };