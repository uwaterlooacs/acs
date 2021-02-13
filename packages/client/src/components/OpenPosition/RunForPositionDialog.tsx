import 'react-dropzone-uploader/dist/styles.css';

import type { IFileWithMeta, StatusValue } from 'react-dropzone-uploader';
import type { PositionDoc } from '@acs/shared';

import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  ButtonGroup,
  CardMedia,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import Dropzone from 'react-dropzone-uploader';
import { UserContext } from 'context/user/state';
import Spacer from 'components/Spacer';
import { APIRoutes } from 'utils/api/endpoints';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: spacing(3),
  },
  video: {
    maxHeight: 550,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
}));

type Tab = 'Video' | 'Write Up';

type Props = {
  position: PositionDoc;
};

const RunForPositionDialog: React.FC<Props> = ({ position }) => {
  const classes = useStyles();

  const { user, token } = useContext(UserContext);

  const [tab, setTab] = useState<Tab>('Video');
  const [loading, setLoading] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  const getUploadParams = () => {
    return {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      url: `${APIRoutes.NOMINATION}/upload?id=${position._id}`,
    };
  };

  const handleChangeStatus = (_file: IFileWithMeta, status: StatusValue) => {
    if (status === 'preparing') {
      setLoading(true);
    }
    if (status === 'done') {
      setLoading(false);
      setVideoSrc(
        `https://nominationvideos.s3.us-east-2.amazonaws.com/${user?.firstName}-${user?.lastName}-${position._id}.mp4`,
      );
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">Run for {position.title}</Typography>
      <Spacer height={8} />
      <ButtonGroup fullWidth>
        <Button
          color={tab === 'Video' ? 'primary' : 'secondary'}
          onClick={() => setTab('Video')}
        >
          Video
        </Button>
        <Button
          disabled={loading}
          color={tab === 'Write Up' ? 'primary' : 'secondary'}
          onClick={() => setTab('Write Up')}
        >
          Write Up
        </Button>
      </ButtonGroup>
      <Spacer height={8} />
      {tab === 'Video' ? (
        <>
          {videoSrc ? (
            <CardMedia
              className={classes.video}
              component="video"
              title={`${user?.firstName} ${user?.lastName}'s video submission`}
              src={videoSrc}
              controls
            />
          ) : (
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              submitButtonContent={null}
              accept="video/*"
              multiple={false}
              maxFiles={1}
            />
          )}
          {loading && (
            <>
              <Spacer height={8} />
              <div className={classes.loadingContainer}>
                <CircularProgress />
              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default RunForPositionDialog;
