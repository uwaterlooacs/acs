import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_CLIENT_ID,
  secretAccessKey: process.env.AWS_CLIENT_SECRET,
});

export const uploadFile = (fileName: string, fileContent: Buffer) => {
  const params = {
    Bucket: 'nominationvideos',
    Key: fileName,
    Body: fileContent,
  };

  s3.upload(params, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};
