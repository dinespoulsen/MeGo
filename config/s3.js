import AWS from 'aws-sdk';

AWS.config.update({accessKeyId: process.env.AKIAJ5WXTH6FR4X4ZEEA, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
AWS.config.update({region: 'eu-west-2'});

let s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: process.env.AWS_S3_BUCKET_NAME}
});

export default s3;
