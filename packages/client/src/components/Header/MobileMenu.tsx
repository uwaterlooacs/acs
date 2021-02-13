import type { WithStyles, Theme } from '@material-ui/core/styles';

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Divider from '@material-ui/core/Divider';
import { VotingContext } from 'context/voting/state';
import { UserContext } from 'context/user/state';
import { getMenuLinks } from './utils';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      height: 48,
    },
    list: {
      width: 250,
    },
    menuLink: {
      color: theme.palette.text.disabled,
    },
    selected: {
      color: theme.palette.text.primary,
    },
  });

interface Props extends WithStyles<typeof styles> {
  currentPathname: string;
  onLoginClicked: () => void;
}

function MobileMenu({ classes, currentPathname, onLoginClicked }: Props) {
  const { user } = useContext(UserContext);
  const { stage } = useContext(VotingContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuLinks = getMenuLinks(stage, user);

  return (
    <div className={classes.container}>
      <IconButton aria-label="menu" onClick={() => setIsDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div
          className={classes.list}
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
          onKeyDown={() => setIsDrawerOpen(false)}
        >
          <List>
            {menuLinks.map((menuLink) => (
              <ListItem
                key={menuLink.title}
                className={classes.menuLink}
                component={Link}
                to={menuLink.link}
                selected={currentPathname === menuLink.link}
              >
                <ListItemText
                  className={classNames({
                    [classes.selected]: currentPathname === menuLink.link,
                  })}
                  primary={menuLink.title}
                />
              </ListItem>
            ))}
            <Divider />
            <ListItem button onClick={onLoginClicked}>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(MobileMenu);
