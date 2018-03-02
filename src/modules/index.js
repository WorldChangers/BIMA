/* Export the API routes to the index page */
import userRoutes from './user/user.routes';
import vehicleRoutes from './vehicle/vehicle.routes';
import claimRoutes from './claims/claims.routes';
import clientRoutes from './client/client.routes';

export default app => {
  app.use('/api/v1/users', userRoutes);
  //app.use('/api/v1/claims', claimRoutes);
  app.use('/api/v1/vehicles', vehicleRoutes);
  app.use('/api/v1/clients', clientRoutes);
};
