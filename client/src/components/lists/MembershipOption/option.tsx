import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ MembershipOption } from './types';

import React, { useContext } from 'react';
import { AuthPanelContext } from 'context/authPanel/state';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import BWButton from 'components/buttons/BWButton';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(4),
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
  option: MembershipOption;
  isLast?: boolean;
}

function Option({ classes, option, isLast }: Props) {
  const { setOption, setIsOpen } = useContext(AuthPanelContext);

  const openAuthPanel = () => {
    if (option.authPanelOption) {
      setOption(option.authPanelOption);
      setIsOpen(true);
    }
  };

  return (
    <div
      className={classnames(classes.container, {
        [classes.separator]: !isLast,
      })}
    >
      <Typography
        variant="h4"
        align="center"
        className={classnames(classes.text, classes.title)}
      >
        {option.title}
      </Typography>
      <Typography variant="body2" align="center" className={classes.text}>
        {option.description}
      </Typography>
      <BWButton onClick={openAuthPanel}>{option.cta}</BWButton>
    </div>
  );
}

export default withStyles(styles)(Option);
