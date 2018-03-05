import { Router } from 'express';
import validate from 'express-validation';
import * as vehicleController from './vehicle.controller';
import vehicleValidation from './vehicle.validation';
import { authJwt } from '../../services/auth';
import middleware from './vehicle.middlewares';

const routes = new Router();

routes.post(
  '/claims',
  authJwt,
  validate(vehicleValidation.create),
  vehicleController.create,
);


routes.post(
  '/search', 
  authJwt,
  vehicleController.search
)

routes.post(
  '/addClaims',
  authJwt,
  vehicleController.addClaims
)

routes.get(
  '/riskScore/:idNumber',
  authJwt,
  vehicleController.riskScore
)

routes.put(
  '/edit/claims/:vehicleId/:claimsId',
  authJwt,
  vehicleController.editClaim
)
export default routes;
