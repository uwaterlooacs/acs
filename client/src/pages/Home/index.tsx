import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ ScreenSize } from 'types/theme';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Typography } from '@material-ui/core';
import useScreenSize from 'utils/hooks/useScreenSize';
import SocialIcons from 'components/SocialIcons';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      maxWidth: '100%',
      minHeight: `calc(100vh - ${2 * theme.spacing(4)}px)`,
      backgroundColor: '#3EA2FE',
      padding: theme.spacing(4),
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: `calc(100% - ${2 * theme.spacing(2)}px)`,
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    text: {
      color: 'white',
    },
    topSpacing: {
      marginTop: theme.spacing(4),
    },
    socialContainer: {
      marginTop: theme.spacing(4),
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  });

function Home({ classes }: WithStyles<typeof styles>) {
  const ss = useScreenSize();
  const bannerSrc =
    ss === ScreenSize.SM || ss === ScreenSize.XS
      ? 'assets/constr.png'
      : 'assets/constr-wide.png';

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img src={bannerSrc} alt="banner" className={classes.image} />
      </div>
      <Typography variant="h4" align="center" className={classes.text}>
        We are currently building our
      </Typography>
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: 'bold' }}
        className={classes.text}
      >
        awesome new website
      </Typography>
      <Typography
        variant="h5"
        align="center"
        className={classnames(classes.text, classes.topSpacing)}
      >
        Check out our social media for the latest updates
      </Typography>
      <div className={classes.socialContainer}>
        <SocialIcons theme="white" />
      </div>
    </div>
  );
}

export default withStyles(styles)(Home);
