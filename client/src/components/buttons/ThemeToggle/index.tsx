import React, { useContext } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeContext } from 'context/theme/state';
import LightTheme from 'theme/themes/light';
import DarkTheme from 'theme/themes/dark';

const styles = (theme: Theme) => createStyles({
  button: {
    height: '100%',
    width: '100%',
    justifyContent: 'left',
    color: theme.palette.text.primary
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    }
  },
  iconSize: {
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24
    }
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

function ThemeToggleButton({ classes }: WithStyles<typeof styles>) {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme.name === 'light' ? DarkTheme : LightTheme);
  }

  return (
    <Button className={classes.button} onClick={toggleTheme}>
      <div className={classes.iconContainer}>
        <Brightness4Icon className={classes.iconSize} />
      </div>
      <div className={classes.labelContainer}>
        <p>Toggle Theme</p>
      </div>
    </Button>
  );
}

export default withStyles(styles)(ThemeToggleButton);
