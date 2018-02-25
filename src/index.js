/* eslint-disable no-console */
/**
 * Server setup
 */
import express from 'express';
import chalk from 'chalk';

import './config/database';
import middlewaresConfig from './config/middlewares';
import constants from './config/constants';
import ApiRoutes from './modules/';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome');
});
// Wrap all the middlewares with the server
middlewaresConfig(app);

// Add the apiRoutes stack to the server
ApiRoutes(app);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(constants.PORT, err => {
    if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(
        chalk.green.bold(
          `
        Keep Hacking 🍺
        App listen on port: ${constants.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `,
        ),
      );
    }
  });
}

export default app;
