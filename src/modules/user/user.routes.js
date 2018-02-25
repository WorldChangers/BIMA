import { Router } from 'express';
import validate from 'express-validation';
import * as userController from './user.controller';
import userValidation from './user.validation';
import { authLocal } from '../../services/auth';

const routes = new Router();

// handles the user signup routes
routes.post('/signup', validate(userValidation.signup), userController.signup);

routes.post('/login', authLocal, userController.login);

// Handling forget password
// routes.post(
//   '/forget',
//   validate(userValidation.forget),
//   userController.forgetPassword,
// );

// routes.get('/forget/:token', (req, res) => {
//   res.send('Welcome to change your password');
// });

export default routes;
