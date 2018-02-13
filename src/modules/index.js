/* Export the API routes to the index page */

import userRoutes from './user/user.routes';
import PassengerRoutes from './passenger/passenger.routes';
import BusRoutes from './bus/bus.routes';
import TripRoutes from './trip/trip.routes';

export default app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/passenger', PassengerRoutes)
  app.use('/api/v1/bus', BusRoutes)
  app.use('/api/v1/trip', TripRoutes)
};
