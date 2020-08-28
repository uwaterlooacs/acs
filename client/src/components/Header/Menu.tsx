import type { WithStyles, Theme } from '@material-ui/core/styles';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { UserContext } from 'context/user/state';
import { Button } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import BWButton from 'components/buttons/BWButton';
import { MENU_LINKS } from './constants';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      height: 48,
      display: 'flex',
      alignItems: 'center',
    },
    menuLink: {
      color: theme.palette.text.disabled,
      lineHeight: '18px',
      marginRight: theme.spacing(4),
    },
    selected: {
      color: theme.palette.text.primary,
      borderBottom: '2px solid',
    },
  });

interface Props extends WithStyles<typeof styles> {
  currentPathname: string;
  onLoginClicked: () => void;
}

function Menu({ classes, currentPathname, onLoginClicked }: Props) {
  const { user } = useContext(UserContext);

  return (
    <div className={classes.container}>
      {MENU_LINKS.map((menuLink) => (
        <Button
          key={menuLink.title}
          className={classes.menuLink}
          size="small"
          component={Link}
          to={menuLink.link}
        >
          <div
            className={classNames({
              [classes.selected]: currentPathname === menuLink.link,
            })}
          >
            {menuLink.title}
          </div>
        </Button>
      ))}
      {!user && (
        <BWButton size="small" onClick={onLoginClicked}>
          Login
        </BWButton>
      )}
    </div>
  );
}

export default withStyles(styles)(Menu);
