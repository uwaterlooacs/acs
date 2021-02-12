import 'react-dropzone-uploader/dist/styles.css';

import type { IFileWithMeta } from 'react-dropzone-uploader';

import React, { useContext } from 'react';
import Dropzone from 'react-dropzone-uploader';
import { UserContext } from 'context/user/state';
import { APIRoutes } from 'utils/api/endpoints';

const VideoUploader: React.FC = () => {
  const { token } = useContext(UserContext);

  const getUploadParams = () => {
    return {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      url: `${APIRoutes.NOMINATION}/upload`,
    };
  };

  const handleSubmit = (files: IFileWithMeta[]) => {
    console.log(files.map((f) => f.meta));
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onSubmit={handleSubmit}
      accept="video/*"
      multiple={false}
    />
  );
};

export default VideoUploader;
