import type { File } from '../types/file';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_CLIENT_ID,
  secretAccessKey: process.env.AWS_CLIENT_SECRET,
});

const BUCKET_NAME = 'nominationvideos';

export const uploadFile = (
  file: File,
  callback: (error: AWS.AWSError, data: AWS.S3.ManagedUpload.SendData) => void,
) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: file.name,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  s3.upload(params, callback);
};

export const deleteFile = (
  fileName: string,
  callback: (error: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => void,
) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  s3.deleteObject(params, callback);
};

export const getFile = (
  fileName: string,
  callback: (error: AWS.AWSError, data: AWS.S3.GetObjectOutput) => void,
) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  s3.getObject(params, callback);
};
