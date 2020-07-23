import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ MembershipOption } from './types';

import React, { useContext, useState, useEffect } from 'react';
import { AuthPanelContext } from 'context/authPanel/state';
import { withStyles, createStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classnames from 'classnames';
import { Typography, Slide } from '@material-ui/core';
import BWButton from 'components/buttons/BWButton';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(4),
      cursor: 'pointer',
      [theme.breakpoints.up('sm')]: {
        width: '10%',
      },
    },
    separator: {
      borderRight: '0.1vw solid black',
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
  isLast?: boolean;
}

function Option({ classes, theme, option, isLast }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { setOption, setIsOpen } = useContext(AuthPanelContext);

  useEffect(() => {
    setTimeout(() => setShowOptions(true), 1000);
  }, []);

  const openAuthPanel = () => {
    if (option.authPanelOption) {
      setOption(option.authPanelOption);
      setIsOpen(true);
    }
  };

  return (
    <Slide direction="up" in={showOptions} timeout={250}>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={classnames(classes.container, {
          [classes.separator]: !isLast,
        })}
        onClick={openAuthPanel}
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
      </div>
    </Slide>
  );
}

export default withStyles(styles, { withTheme: true })(Option);
