import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'components/Page';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: `0 ${spacing(2)}px`,
    height: '100%',
  },
  text: {
    textAlign: 'center',
  },
}));

const Admin: React.FC = () => {
  const classes = useStyles();
  return (
    <Page>
      <div className={classes.container}>
        <Typography variant="h4" align="center">
          Admin
        </Typography>
      </div>
    </Page>
  );
};

export default Admin;
