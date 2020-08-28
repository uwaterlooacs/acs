import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ MembershipOption } from './types';

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { AuthPanelContext } from 'context/authPanel/state';
import { UserContext } from 'context/user/state';
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
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { setOption, setIsOpen } = useContext(AuthPanelContext);

  const onOptionClick = (option: MembershipOption) => {
    if (option.authPanelOption) {
      setOption(option.authPanelOption);
      setIsOpen(true);
    } else if (option.cta === 'SIGN UP') {
      history.push('/membership/howtojoin');
    }
  };

  const optionsList = user
    ? options
        .filter((option) => option.cta !== 'LOGIN')
        .filter((option) => option.cta !== 'SIGN UP')
    : options;

  return (
    <div className={classes.container}>
      {optionsList.map((option: MembershipOption, index: number) => (
        <Option
          key={option.title}
          option={option}
          isLast={index === optionsList.length - 1}
          onClick={() => onOptionClick(option)}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(MembershipOptionList);
