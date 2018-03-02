import HTTPStatus from 'http-status';
import Vehicle from './vehicle.model';
import Client from '../client/client.model';
import User from '../user/user.model'

export const create = async (req, res) => {
  try {

    const vehicle = await Vehicle.create(req.body);
    await Client.update(
      { _id: req.body.owner },
      { $set: { vehicle: vehicle._id } },
    );
    return res.status(HTTPStatus.CREATED).json({ msg:'ok'});
  } catch (e) {
    console.log(e);
    // Delete the clients created when error occured
    await Client.findByIdAndRemove(req.body.owner)
    return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg);
  }
};


const clientSearch = async(req, res) => {
  try {
    let clients = await Client.findOne({idNumber: req.body.search})
                              .populate('company')
                              .populate('vehicle')
    await User.update({_id: req.user._id}, {$inc: {searchCount: 1}})
   return res.status(HTTPStatus.CREATED).json(clients);
 } catch (e) {
  console.log(e);
  return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg);
 }
}

const vehicleSearch = async(req, res) => {
  try {
    const vehicle = await Vehicle.findOne({regNumber:req.body.search})
    await User.update({_id: req.user._id}, {$inc: {searchCount: 1}})
    return res.status(HTTPStatus.CREATED).json(vehicle);
  console.log(req.body)
 } catch (e) {
  console.log(e);
  return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg);
 }
}


export const search = async (req, res) => {
  if(req.body.term === 'Client') {
    return clientSearch(req, res);
  }
  return vehicleSearch(req, res);
}



export const addClaims = async (req, res) => {
  try {
    await Vehicle.update(
      { _id: req.body.id },
      { $push: { claims: req.body.claim } },
    );
    return res.status(HTTPStatus.CREATED).json({msg: 'Success'});
  } catch (e) {
    console.log(e)
  }

}


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
