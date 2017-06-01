import dotenv from 'dotenv';
dotenv.config();

const configDB = {
  'url': 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds157621.mlab.com:57621/mego'
};
export default configDB
