import { ROUTES } from 'utils/constants';

import React from 'react';
import { Link } from 'react-router-dom';
import { Slide, Typography, Box, Fade } from '@material-ui/core';
import BWButton from 'components/buttons/BWButton';
import CheckMarkSrc from './checkmark.png';

type Props = {
  variant: 'signUp' | 'renewMembership';
};

const Complete = ({ variant }: Props) => {
  const titleSuffix =
    variant === 'signUp' ? 'signing up' : 'renewing your membership';
  return (
    <div>
      <Slide direction="up" appear in timeout={500}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h3" align="center">
            {`Thanks for ${titleSuffix}!`}
          </Typography>
          <Box marginTop={6}>
            <img src={CheckMarkSrc} alt="Check mark" />
          </Box>
        </Box>
      </Slide>
      <Fade appear in timeout={800}>
        <Box marginTop={6}>
          <Typography variant="h6" align="center">
            After paying a $3 membership fee at any of our upcoming events or
            booth days you can enjoy all of the member benefits.
          </Typography>
        </Box>
      </Fade>
      <Fade appear in timeout={1000}>
        <Box marginTop={6} display="flex" justifyContent="center">
          <BWButton component={Link} to={ROUTES.EVENTS}>
            View Upcoming Events
          </BWButton>
        </Box>
      </Fade>
    </div>
  );
};

export default Complete;
