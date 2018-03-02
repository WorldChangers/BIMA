require('dotenv').config();

const WHITELIST = {
  posts: {
    create: ['title', 'text'],
    update: ['title', 'text'],
  },
  users: {
    create: ['email', 'username', 'password'],
  },
};

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL,
  //MONGO_URL: 'mongodb:/kay:owusutk04@@ds123136.mlab.com:23136/node_boilerplate',
  PORT: process.env.PORT || 3000
};

const testConfig = {
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  //MONGO_URL: 'mongodb://kay:owusutk04@ds123136.mlab.com:23136/node_boilerplate',
  MONGO_URL: 'mongodb://kay:owusutk04@ds235328.mlab.com:35328/insurance',
  PORT: process.env.PORT || 3000
};

const prodConfig = {
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  //MONGO_URL: 'mongodb://kay:owusutk04@ds123136.mlab.com:23136/node_boilerplate',
  MONGO_URL: 'mongodb://kay:owusutk04@ds235328.mlab.com:35328/insurance',
  PORT: process.env.PORT || 3000
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  //MONGO_URL: 'mongodb://kay:owusutk04@ds123136.mlab.com:23136/node_boilerplate'
  MONGO_URL: 'mongodb://kay:owusutk04@ds235328.mlab.com:35328/insurance',
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
