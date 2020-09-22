import type { WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import HorizontalLogo from './HorizontalLogo.jpg';
import MobileMenu from './MobileMenu';
import Menu from './Menu';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      height: 64,
      padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        height: 48,
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
      },
    },
    logo: {
      height: '100%',
    },
  });

interface Props extends WithStyles<typeof styles> {
  theme: Theme;
  onLoginClicked: () => void;
}

function Header({ theme, classes, onLoginClicked }: Props) {
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.container}>
      <img
        className={classes.logo}
        src={HorizontalLogo}
        alt="University of Waterloo Association of Caribbean Students"
      />
      {isMobile ? (
        <MobileMenu
          currentPathname={location.pathname}
          onLoginClicked={onLoginClicked}
        />
      ) : (
        <Menu
          currentPathname={location.pathname}
          onLoginClicked={onLoginClicked}
        />
      )}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Header);
