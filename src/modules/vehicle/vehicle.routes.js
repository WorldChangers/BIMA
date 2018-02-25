import { Router } from 'express';
import validate from 'express-validation';
import * as vehicleController from './vehicle.controller';
import vehicleValidation from './vehicle.validation';
import { authJwt } from '../../services/auth';
import middleware from './vehicle.middlewares';

const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(vehicleValidation.create),
  vehicleController.create,
);

export default routes;
