import HTTPStatus from 'http-status';
import Vehicle from './vehicle.model';
import Client from '../client/client.model';

export const create = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    await Client.update(
      { _id: req.body.owner },
      { $push: { vehicles: vehicle._id } },
    );
    return res.status(HTTPStatus.CREATED).json({ vehicleId: vehicle._id });
  } catch (e) {
    console.log(e);
    return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg);
  }
};

// // Prevent Zero Stage of the application by showing org previous uploaded claims
// export const getOrgClaims = (req, res) => {
//   try {
//     const claim = await Claim.findOne(req.user)
//     return res.status(HTTPStatus.ACCEPTED).json(claim);
//   } catch (e) {
//     return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg);
//   }

// };

// // Get all claims from the database
// export const getAllClaims = (req, res) => {
//     try {
//         const claims = await Claim.find()
//         return res.status(HTTPStatus.ACCEPTED).json(claims)
//     } catch (e) {
//         return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg)
//     }
// }
