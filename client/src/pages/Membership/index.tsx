import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Fade } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Page from 'components/Page';
import ShrinkImage from 'components/ShrinkImage';
import MembershipOptionsList from 'components/lists/MembershipOption';
import HowToJoinPage from './HowToJoin';
import SignUpPage from './SignUp';
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
      <Switch>
        <Route path="/membership/signup" exact>
          <Fade key="/membership/signup" in appear timeout={1000}>
            <div>
              <SignUpPage />
            </div>
          </Fade>
        </Route>
        <Route path="/membership/howtojoin" exact>
          <Fade key="/membership/howtojoin" in appear timeout={1000}>
            <div>
              <HowToJoinPage />
            </div>
          </Fade>
        </Route>
        <Route path="/membership">
          <ShrinkImage shift src={AreYouAMember} alt="Are you a member?" />
          <div className={classes.listContainer}>
            <MembershipOptionsList />
          </div>
        </Route>
      </Switch>
    </Page>
  );
}

export default withStyles(styles)(Membership);
