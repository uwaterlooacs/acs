import { /*type*/ WithStyles } from '@material-ui/core/styles';
import { /*type*/ AuthPanelOption } from 'types/auth';

import React, { useContext } from 'react';
import { AuthPanelContext } from 'context/authPanel/state';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BWButton from 'components/buttons/BWButton';

const styles = createStyles({
  container: {},
});

interface Props extends WithStyles<typeof styles> {
  title: string;
  description: string;
  option: AuthPanelOption;
}

function MembershipOption({ classes, title, description, option }: Props) {
  const { setOption, setIsOpen } = useContext(AuthPanelContext);

  const openAuthPanel = () => {
    setOption(option);
    setIsOpen(true);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h2">{description}</Typography>
      <BWButton onClick={openAuthPanel}>{option.title}</BWButton>
    </div>
  );
}

export default withStyles(styles)(MembershipOption);
