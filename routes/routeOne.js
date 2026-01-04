import express from 'express';
import * as routeOneController from "../controllers/controllerOne.js";
const routeOne = express.Router();

routeOne.get("/", routeOneController.renderIndex);

export { routeOne };