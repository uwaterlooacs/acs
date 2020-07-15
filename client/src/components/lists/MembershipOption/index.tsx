import { /*type*/ WithStyles } from '@material-ui/core/styles';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
  container: {},
});

function MembershipOptionList({ classes }: WithStyles<typeof styles>) {
  return <div className={classes.container}></div>;
}

export default withStyles(styles)(MembershipOptionList);
