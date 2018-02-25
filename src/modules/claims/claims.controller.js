import HTTPStatus from 'http-status';
import Claim from './claims.model';
import Vehicle from '../vehicle/vehicle.model';

// Create Claim
export const create = async (req, res) => {
  try {
    const claim = await Claim.create(req.body);
    await Vehicle.update(
      { _id: req.body.vehicle },
      { $push: { claims: claim._id } },
    );
    return res
      .status(HTTPStatus.CREATED)
      .json({ msg: 'Claim created successfully' });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST);
  }
};

// // Prevent Zero Stage of the application by showing org previous uploaded claims
// export const getOrgClaims =  async (req, res) => {
//   try {
//     const claim = await Claim.findOne(req.user)
//     return res.status(HTTPStatus.ACCEPTED).json(claim);
//   } catch (e) {
//     return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg);
//   }

// };

// // Get all claims from the database
// export const getAllClaims = async (req, res) => {
//     try {
//         const claims = await Claim.find()
//         return res.status(HTTPStatus.ACCEPTED).json(claims)
//     } catch (e) {
//         return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg)
//     }
// }

// // Todo
// // To handle the change Password
// // export const changePassword = async (req, res) => {
// //   try {
// //     const user = User.findOne({resetPasswordToken:req.params.token}, {$gt: {resetPassword}})
// //   } catch(e){

// //   }
// // }
