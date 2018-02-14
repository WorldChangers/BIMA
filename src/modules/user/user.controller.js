import HTTPStatus from 'http-status';
import User from './user.model';
import token from '../../utils/crypto';
import email from '../../services/email';

export const signup = async (req, res) => {
  try {
    // User.collection.dropIndex({"username":1})
    const user = await User.create(req.body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg);
  }
};

export const login = (req, res) => {
  res.status(HTTPStatus.ACCEPTED).json(req.user);
};

// Forget password
export const forgetPassword = async (req, res) => {
  try {
    const user = await User.checkEmail(req.body.email);

    if (!user)
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ error: 'Sorry no account found' });

    const date = Date.now() + 3600000;
    await User.updateToken(user.email, await token(), date);

    await email(user, await token(), req);

    return res
      .status(HTTPStatus.OK)
      .json({ message: 'Reset password Email sent successfully' });
  } catch (e) {
    return res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
};

// Todo
// To handle the change Password
// export const changePassword = async (req, res) => {
//   try {
//     const user = User.findOne({resetPasswordToken:req.params.token}, {$gt: {resetPassword}})
//   } catch(e){

//   }
// }
