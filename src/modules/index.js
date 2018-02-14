/* Export the API routes to the index page */

import userRoutes from './user/user.routes';

export default app => {
  app.use('/api/v1/users', userRoutes);
};
