import HTTPStatus from 'http-status';
import Client from './client.model';
import User from '../user/user.model';

// Create Claim
export const create = async (req, res) => {
  try {
    //Client.collection.dropIndex({"email":1})

    req.body.company = req.user._id;
    const client = await Client.create(req.body);
    await User.update(
      { _id: req.user._id },
      { $push: { clients: client._id } },
    );
    return res.status(HTTPStatus.CREATED).json({ clientId: client._id });
  } catch (e) {
    console.log(e);
    return res.status(HTTPStatus.BAD_REQUEST);
  }
};

export const getCompanyClients = async (req, res) => {
  try {
    const clients = await Client.find({company: req.user.id})
                  .populate('vehicle')
                  .sort({ createdAt: 'desc' });
    return res.status(HTTPStatus.ACCEPTED).json(clients);
  } catch (e) {
    console.log(e);
    return res.status(HTTPStatus.BAD_REQUEST);
  }
};


export const editCompanyClients = async(req, next) => {
  try {
    Client.update({ _id: req.body.id }, { $set: req.body}, callback);
    return res.status(HTTPStatus.ACCEPTED).json({msg: 'Updated successfully'})
  } catch (e) {
    console.log(e);
    return res.status(HTTPStatus.BAD_REQUEST);
  }
}


// Calculation of Risk Score
// Routes to handle risk score
// Update the riskScore in company risk score
// 