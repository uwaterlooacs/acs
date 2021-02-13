import { NominationDoc, PositionDoc } from '@acs/shared';

import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Typography } from '@material-ui/core';
import { UserContext } from 'context/user/state';
import NominationCard from 'components/NominationCard';
import Spacer from 'components/Spacer';
import { getNominations } from 'utils/api/nomination';
import EmptyPosition from './EmptyPosition';
import RunForPositionDialog from './RunForPositionDialog';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  nominationsContainer: {
    display: 'flex',
    overflowX: 'scroll',
  },
  nominationContainer: {
    display: 'flex',
  },
}));

type Props = {
  position: PositionDoc;
};

const OpenPosition: React.FC<Props> = ({ position }) => {
  const classes = useStyles();

  const { user, token } = useContext(UserContext);

  const [nominations, setNominations] = useState<NominationDoc[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchNominations = async () => {
      try {
        setNominations(await getNominations(position._id, token));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchNominations();
  }, [position._id, token]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const addToList = (nomination: NominationDoc) => {
    setNominations([...nominations, nomination]);
  };

  const removeFromList = (nomination: NominationDoc) => {
    setNominations(nominations.filter((n) => n._id !== nomination._id));
  };

  const alreadyRunning =
    nominations.find((nomination) => nomination.candidate === user?._id) !==
    undefined;

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h5">{position.title}</Typography>
        <Button color="primary" onClick={openDialog} disabled={alreadyRunning}>
          Run
        </Button>
      </div>
      <Typography variant="body1">{position.description}</Typography>
      <Spacer height={16} />
      {nominations.length > 0 ? (
        <div className={classes.nominationsContainer}>
          {nominations.map((nomination, index) => (
            <div key={nomination._id} className={classes.nominationContainer}>
              {index !== 0 && <Spacer width={16} />}
              <NominationCard
                nomination={nomination}
                removeFromList={removeFromList}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyPosition />
      )}
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <RunForPositionDialog
          position={position}
          onClose={closeDialog}
          addToList={addToList}
        />
      </Dialog>
    </>
  );
};

export default OpenPosition;
