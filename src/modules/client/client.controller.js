import HTTPStatus from 'http-status';
import Client from './client.model';
import User from '../user/user.model';

// Create Claim
export const create = async (req, res) => {
  try {
    //Client.collection.dropIndex({"email":1})

    req.body.organization = req.user._id;
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

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({})
      .populate('organization')
      .populate({
        path: 'vehicles',
        populate: {
          path: 'claims',
        },
      })
      .sort({ createdAt: 'desc' });
    return res.status(HTTPStatus.ACCEPTED).json(clients);
  } catch (e) {
    console.log(e);
    return res.status(HTTPStatus.BAD_REQUEST);
  }
};
