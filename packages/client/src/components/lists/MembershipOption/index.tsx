import type { WithStyles, Theme } from '@material-ui/core/styles';
import type { MembershipOption } from './types';

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { AuthPanelContext } from 'context/authPanel/state';
import { UserContext } from 'context/user/state';
import { ROUTES } from 'utils/constants';
import Option from './option';
import options from './options';
import { renewMembership } from 'utils/api/membership';

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
  const { token } = useContext(UserContext);

  const history = useHistory();

  const { setOption, setIsOpen } = useContext(AuthPanelContext);

  const onOptionClick = async (option: MembershipOption) => {
    if (option.authPanelOption) {
      setOption(option.authPanelOption);
      setIsOpen(true);
    } else if (option.cta === 'SIGN UP') {
      history.push(`${ROUTES.MEMBERSHIP}/howtojoin`);
    } else if (option.cta === 'RENEW MEMBERSHIP') {
      try {
        await renewMembership(token);
        history.push(`${ROUTES.MEMBERSHIP}/verifyinfo`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  const optionsList = token
    ? options
        .filter((option) => option.cta !== 'LOGIN')
        .filter((option) => option.cta !== 'SIGN UP')
    : options.filter((option) => option.cta !== 'RENEW MEMBERSHIP');

  return (
    <div className={classes.container}>
      {optionsList.map((option: MembershipOption) => (
        <Option
          key={option.title}
          option={option}
          onClick={() => onOptionClick(option)}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(MembershipOptionList);
