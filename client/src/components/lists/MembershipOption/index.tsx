import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ MembershipOption } from './types';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Option from './option';
import options from './options';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  });

function MembershipOptionList({ classes }: WithStyles<typeof styles>) {
  return (
    <div className={classes.container}>
      {options.map((option: MembershipOption, index: number) => (
        <Option
          key={option.title}
          option={option}
          isLast={index === options.length - 1}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(MembershipOptionList);
