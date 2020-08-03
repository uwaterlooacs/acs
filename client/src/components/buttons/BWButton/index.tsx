import {
  Button,
  withStyles,
  createStyles,
  ButtonProps,
  WithStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      color: theme.palette.getContrastText(theme.palette.background.default),
      backgroundColor: theme.palette.background.default,
      border: '1px solid',
      borderRadius: 8,
      borderColor: theme.palette.getContrastText(
        theme.palette.background.default,
      ),
      '&:hover, &.hover': {
        color: theme.palette.getContrastText(theme.palette.text.primary),
        backgroundColor: theme.palette.text.primary,
      },
    },
  });

type BWButtonProps = ButtonProps &
  WithStyles<typeof styles> & {
    component?: React.ReactNode;
    to?: string;
  };

const BWButton: React.FC<BWButtonProps> = ({
  classes,
  ...props
}: BWButtonProps) => {
  return <Button classes={classes} {...props} />;
};

export default withStyles(styles)(BWButton);
