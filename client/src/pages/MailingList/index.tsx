import type { WithStyles, Theme } from '@material-ui/core/styles';
import type { Event } from './events';

import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EmailSlide from './slides/Email';
import FeedbackSlide from './slides/Feedback';
import SocialSlide from './slides/Social';
import { mailingListSubmit } from 'utils/data/mailingList';

const LOGO_SIZE = 200;
const TRANSITION_TIME = '0.5s';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 960,
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    logoContainer: {
      width: LOGO_SIZE,
      height: LOGO_SIZE,
      margin: `${theme.spacing(2)} 0 ${theme.spacing(1)}`,
    },
    logo: {
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: LOGO_SIZE / 2,
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: `
        ${theme.spacing(4)}px 
        ${theme.spacing(2)}px 
        0 
        ${theme.spacing(2)}px`,
    },
    slider: {
      display: 'flex',
      marginBottom: theme.spacing(2),
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      transition: TRANSITION_TIME,
      maxWidth: '100%',
    },
    slide: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '100%',
      transition: TRANSITION_TIME,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(4)}px`,
    },
    button: {
      transition: TRANSITION_TIME,
    },
  });

function MailingListForm({ classes }: WithStyles<typeof styles>) {
  const [email, setEmail] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [feedback, setFeedback] = useState('');
  const [translateValue, setTranslateValue] = useState(0);

  const goLeft = () => {
    setTranslateValue(translateValue + 100);
    window.scrollTo(0, 0);
  };

  const goRight = () => {
    setTranslateValue(translateValue - 100);
    window.scrollTo(0, 0);
  };

  const submit = async () => {
    try {
      await mailingListSubmit({
        email,
        interestedEvents: events.map((event) => event.title),
        otherFeedback: feedback,
      });
      goRight();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Typography variant="h4" color="textPrimary" align="center">
          Mailing List And Event Suggestions
        </Typography>
      </div>

      <div className={classes.logoContainer}>
        <img className={classes.logo} src="/assets/logo.jpg" alt="ACS Logo" />
      </div>

      <div className={classes.slider}>
        <div
          className={classes.slide}
          style={{ transform: `translateX(${translateValue}%)` }}
        >
          <EmailSlide email={email} setEmail={setEmail} goRight={goRight} />
        </div>
        <div
          className={classes.slide}
          style={{ transform: `translateX(${translateValue}%)` }}
        >
          <FeedbackSlide
            events={events}
            setEvents={setEvents}
            feedback={feedback}
            setFeedback={setFeedback}
            goLeft={goLeft}
            submit={submit}
          />
        </div>
        <div
          className={classes.slide}
          style={{ transform: `translateX(${translateValue}%)` }}
        >
          <SocialSlide />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(MailingListForm);
