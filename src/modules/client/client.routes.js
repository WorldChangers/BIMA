import { Router } from 'express';
import validate from 'express-validation';
import * as clientController from './client.controller';
import clientValidation from './client.validation';
import { authJwt } from '../../services/auth';

const routes = new Router();

// handles the vehicle creation
routes.post('/', authJwt, clientController.create);

routes.get('/', authJwt, clientController.getCompanyClients);

export default routes;
