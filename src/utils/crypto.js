import crypto from 'crypto';

export default () => {
  const buff = crypto.randomBytes(20);
  const token = buff.toString('hex');
  return token;
};
