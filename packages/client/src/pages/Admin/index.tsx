import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup, Button } from '@material-ui/core';
import { UserContext } from 'context/user/state';
import Page from 'components/Page';
import Events from './Events';
import Voting from './Voting';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: `0 ${spacing(2)}px`,
    height: '100%',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
}));

enum ADMIN_PAGE {
  EVENTS,
  VOTING,
}

const Admin: React.FC = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  const [adminPage, setAdminPage] = useState(ADMIN_PAGE.VOTING);

  if (!user?.isAdmin) {
    return <Redirect to={ROUTES.LANDING} />;
  }

  const goToEvents = () => {
    setAdminPage(ADMIN_PAGE.EVENTS);
  };

  const goToVoting = () => {
    setAdminPage(ADMIN_PAGE.VOTING);
  };

  return (
    <Page>
      <div className={classes.container}>
        <ButtonGroup variant="text">
          <Button
            className={classes.button}
            color={adminPage === ADMIN_PAGE.EVENTS ? 'primary' : 'secondary'}
            onClick={goToEvents}
          >
            Events
          </Button>
          <Button
            className={classes.button}
            color={adminPage === ADMIN_PAGE.VOTING ? 'primary' : 'secondary'}
            onClick={goToVoting}
          >
            Voting
          </Button>
        </ButtonGroup>
        {adminPage === ADMIN_PAGE.EVENTS ? (
          <Events />
        ) : adminPage === ADMIN_PAGE.VOTING ? (
          <Voting />
        ) : null}
      </div>
    </Page>
  );
};

export default Admin;
