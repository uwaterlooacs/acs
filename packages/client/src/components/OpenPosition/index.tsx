import { NominationDoc, PositionDoc } from '@acs/shared';

import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Typography } from '@material-ui/core';
import { UserContext } from 'context/user/state';
import NominationCard from 'components/NominationCard';
import { getNominations } from 'utils/api/nomination';
import EmptyPosition from './EmptyPosition';
import RunForPositionDialog from './RunForPositionDialog';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

type Props = {
  position: PositionDoc;
};

const OpenPosition: React.FC<Props> = ({ position }) => {
  const classes = useStyles();

  const { token } = useContext(UserContext);

  const [nominations, setNominations] = useState<NominationDoc[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

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

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h5">{position.title}</Typography>
        <Button color="primary" onClick={openDialog}>
          Run
        </Button>
      </div>
      <Typography variant="body1">{position.description}</Typography>
      <div>
        {nominations.length > 0 ? (
          nominations.map((nomination) => (
            <NominationCard key={nomination._id} nomination={nomination} />
          ))
        ) : (
          <EmptyPosition />
        )}
      </div>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <RunForPositionDialog position={position} />
      </Dialog>
    </>
  );
};

export default OpenPosition;
