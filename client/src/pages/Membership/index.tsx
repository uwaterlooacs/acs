import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Page from 'components/Page';
import ShrinkImage from 'components/ShrinkImage';
import MembershipOptionsList from 'components/lists/MembershipOption';
import AreYouAMember from './AreYouAMember.png';

const styles = (theme: Theme) =>
  createStyles({
    listContainer: {
      marginTop: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2),
      },
    },
  });

function Membership({ classes }: WithStyles<typeof styles>) {
  return (
    <Page>
      <ShrinkImage shift src={AreYouAMember} alt="Are you a member?" />
      <div className={classes.listContainer}>
        <MembershipOptionsList />
      </div>
    </Page>
  );
}

export default withStyles(styles)(Membership);
