import { Router } from 'express';
import validate from 'express-validation';
import * as claimController from './claims.controller';
import claimValidation from './claims.validation';
import { authJwt } from '../../services/auth';

const routes = new Router();

// handles the user signup routes
routes.post(
  '/',
  authJwt,
  validate(claimValidation.create),
  claimController.create,
);

export default routes;
