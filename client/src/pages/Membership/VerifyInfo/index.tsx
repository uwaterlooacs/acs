import type { WithStyles, Theme } from '@material-ui/core/styles';

import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import VerifyInfo from 'components/VerifyInfo';
import Complete from 'components/Complete';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: `calc(100% - ${2 * theme.spacing(3)}px)`,
      padding: `0 ${theme.spacing(3)}px`,
    },
    contentContainer: {},
  });

function VerifyInfoPage({ classes }: WithStyles<typeof styles>) {
  const [complete, setComplete] = useState(false);

  const completeVerify = () => setComplete(true);

  return (
    <div className={classes.container}>
      {!complete ? (
        <VerifyInfo onVerify={completeVerify} />
      ) : (
        <Complete variant="renewMembership" />
      )}
    </div>
  );
}

export default withStyles(styles)(VerifyInfoPage);
