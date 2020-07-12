import React from 'react';
import { Transition } from 'react-transition-group';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import classNames from 'classnames';

type ShiftedClassName =
  | 'entering-shift'
  | 'entered-shift'
  | 'exiting-shift'
  | 'exited-shift'
  | 'unmounted-shift';

const styles = (theme: Theme) =>
  createStyles({
    shrinkimage: {
      display: 'block',
      height: '100%',
      maxWidth: '75vw',
      maxHeight: '75vh',
      margin: `${theme.spacing(4)}px auto`,
      transition: 'transform 300ms ease-in-out',
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
      },
    },
    entering: {
      transform: 'scale(1.25)',
    },
    'entering-shift': {
      transform: 'translateY(100px) scale(1.25)',
    },
    entered: {
      transform: 'scale(1)',
    },
    'entered-shift': {
      transform: 'translateY(0) scale(1)',
    },
    exiting: {},
    'exiting-shift': {},
    exited: {},
    'exited-shift': {},
    unmounted: {},
    'unmounted-shift': {},
  });

interface Props
  extends WithStyles<typeof styles>,
    React.ImgHTMLAttributes<HTMLImageElement> {
  shift?: boolean;
}

const ShrinkImage: React.FC<Props> = ({
  classes,
  shift,
  ...imgProps
}: Props) => {
  return (
    <Transition in appear timeout={1000}>
      {(state) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          className={classNames(classes.shrinkimage, classes[state], {
            [classes[`${state}-shift` as ShiftedClassName]]: shift,
          })}
          {...imgProps}
        />
      )}
    </Transition>
  );
};

export default withStyles(styles)(ShrinkImage);
