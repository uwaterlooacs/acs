import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles,
  Box,
  Button,
} from '@material-ui/core';
import Step from './Step';
import ProfileSrc from './Profile.png';
import MoneySrc from './Money.png';
import BenefitsSrc from './Benefits.png';

const styles = () =>
  createStyles({
    title: {
      fontWeight: 'bold',
    },
  });

type Props = WithStyles<typeof styles>;

const HowToJoin: React.FC<Props> = ({ classes }: Props) => {
  return (
    <div>
      <Typography variant="h2" className={classes.title} align="center">
        How Do I Join ACS?
      </Typography>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        <Step
          stepNumber={1}
          text="Enter Your Information"
          icon={ProfileSrc}
          iconAlt="Profile"
        />
        <Step
          stepNumber={2}
          text="Pay Membership Fees Later"
          icon={MoneySrc}
          iconAlt="Money"
        />
        <Step
          stepNumber={3}
          text="Enjoy All Of The Benefits"
          icon={BenefitsSrc}
          iconAlt="Benefits"
        />
      </Box>
      <Box marginY={12} display="flex" justifyContent="center">
        <Button component={Link} to="/membership/signup" variant="outlined">
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default withStyles(styles)(HowToJoin);
