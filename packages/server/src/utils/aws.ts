import type { File } from '../types/file';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_CLIENT_ID,
  secretAccessKey: process.env.AWS_CLIENT_SECRET,
});

export const uploadFile = (
  file: File,
  callback: (error: Error, data: AWS.S3.ManagedUpload.SendData) => void,
) => {
  const params = {
    Bucket: 'nominationvideos',
    Key: file.name,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  s3.upload(params, callback);
};
