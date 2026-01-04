import express from 'express';
import * as routeTwoController from "../controllers/controllerTwo.js";
const routeTwo = express.Router();

routeTwo.get("/", routeTwoController.renderIndex);

export { routeTwo };