import type { PositionDoc } from '@acs/shared';

import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, useMediaQuery } from '@material-ui/core';
import { getPositions } from 'utils/api/position';
import Spacer from 'components/Spacer';
import PositionDetails from 'components/PositionDetails';

const START_OFFSET = 16;

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  container: {
    padding: `0 ${spacing(4)}px`,
  },
  positionsContainer: {
    [breakpoints.up('sm')]: {
      marginLeft: -START_OFFSET,
      display: 'flex',
    },
  },
  positionContainer: {
    [breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
}));

const Results: React.FC = () => {
  const classes = useStyles();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const [positions, setPositions] = useState<PositionDoc[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setPositions(await getPositions());
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchPositions();
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h4">The results are in!</Typography>
      <Typography variant="h6">
        {"Here's the ACS exec for this term."}
      </Typography>
      {!isMobile && <Spacer height={16} />}
      <div className={classes.positionsContainer}>
        {positions.map((position) => (
          <div key={position._id} className={classes.positionContainer}>
            <Spacer width={START_OFFSET} />
            <PositionDetails position={position} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
