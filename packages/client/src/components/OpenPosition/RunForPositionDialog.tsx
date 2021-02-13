import 'react-dropzone-uploader/dist/styles.css';

import type { IFileWithMeta, StatusValue } from 'react-dropzone-uploader';
import type { NominationDoc, PositionDoc } from '@acs/shared';

import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  ButtonGroup,
  CardMedia,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import Dropzone from 'react-dropzone-uploader';
import { UserContext } from 'context/user/state';
import Spacer from 'components/Spacer';
import { APIRoutes } from 'utils/api/endpoints';
import { createNomination } from 'utils/api/nomination';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: spacing(3),
    minWidth: 250,
  },
  dropzoneInput: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropzoneInputLabel: {
    lineHeight: 10,
    textAlign: 'center',
    color: palette.primary.main,
    cursor: 'pointer',
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
  onClose: () => void;
  addToList: (nomination: NominationDoc) => void;
};

const RunForPositionDialog: React.FC<Props> = ({
  position,
  onClose,
  addToList,
}) => {
  const classes = useStyles();

  const { user, token } = useContext(UserContext);

  const [tab, setTab] = useState<Tab>('Video');
  const [loading, setLoading] = useState(false);

  const [videoSrc, setVideoSrc] = useState('');
  const [writeUp, setWriteUp] = useState('');

  const getUploadParams = () => {
    return {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      url: `${APIRoutes.NOMINATION}/upload?id=${position._id}`,
    };
  };

  const handleChangeStatus = (_file: IFileWithMeta, status: StatusValue) => {
    if (status === 'uploading') {
      setLoading(true);
    } else if (status === 'done' || status === 'aborted') {
      setLoading(false);
      if (status === 'done') {
        setVideoSrc(
          `https://nominationvideos.s3.us-east-2.amazonaws.com/${user?._id}-${position._id}.mp4`,
        );
      }
    }
  };

  const handleSave = async () => {
    try {
      const nomination = await createNomination(
        {
          candidate: user?._id,
          position: position._id,
          video: videoSrc,
          writeUp,
        },
        token,
      );
      addToList(nomination);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    onClose();
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">{position.title}</Typography>
      <Spacer height={8} />
      <ButtonGroup fullWidth>
        <Button
          color={tab === 'Video' ? 'primary' : 'secondary'}
          onClick={() => setTab('Video')}
        >
          Video
        </Button>
        <Button
          color={tab === 'Write Up' ? 'primary' : 'secondary'}
          onClick={() => setTab('Write Up')}
        >
          Write Up
        </Button>
      </ButtonGroup>
      <Spacer height={16} />
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
              classNames={{
                inputLabel: classes.dropzoneInputLabel,
              }}
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
      ) : (
        <TextField
          label="Write Up"
          placeholder={`Hi my name is ${user?.firstName} and I think I would be a good ${position.title} because ...`}
          value={writeUp}
          onChange={(e) => setWriteUp(e.target.value)}
          fullWidth
          multiline
          variant="outlined"
          style={{ minHeight: 200 }}
        />
      )}
      <Spacer height={16} />
      <Button disabled={!videoSrc} onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default RunForPositionDialog;
