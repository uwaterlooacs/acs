import type { WithStyles, Theme } from '@material-ui/core/styles';
import type { MembershipOption } from './types';

import React, { useState, useEffect } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classnames from 'classnames';
import { Typography, Slide } from '@material-ui/core';
import BWButton from 'components/buttons/BWButton';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      background: 'none',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(4),
      cursor: 'pointer',
      [theme.breakpoints.up('md')]: {
        width: '20%',
      },
    },
    title: {
      fontWeight: 'bolder',
    },
    text: {
      marginBottom: theme.spacing(2),
    },
  });

interface Props extends WithStyles<typeof styles> {
  theme: Theme;
  option: MembershipOption;
  onClick: () => void;
}

function Option({ classes, theme, option, onClick }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowOptions(true), 1000);
  }, []);

  return (
    <Slide direction="up" in={showOptions} timeout={250}>
      <button
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={classes.container}
        onClick={onClick}
      >
        <Typography
          variant="h4"
          align="center"
          className={classnames(classes.text, classes.title)}
        >
          {option.title}
        </Typography>
        {(useMediaQuery(theme.breakpoints.down('sm')) || isHovering) && (
          <Typography variant="body2" align="center" className={classes.text}>
            {option.description}
          </Typography>
        )}
        <BWButton classes={isHovering ? { root: 'hover' } : {}}>
          {option.cta}
        </BWButton>
      </button>
    </Slide>
  );
}

export default withStyles(styles, { withTheme: true })(Option);
