import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import EmailSlide from './slides/Email';
import FeedbackSlide from './slides/Feedback';
import SocialSlide from './slides/Social';
import { EVENT } from './types';

const LOGO_SIZE = 200;
const TRANSITION_TIME = '0.3s';
const NUMBER_OF_SLIDES = 3;

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginBottom: theme.spacing(1)
  },
  logo: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: LOGO_SIZE / 2
  },
  slider: {
    display: 'flex',
    width: 400,
    marginBottom: theme.spacing(2),
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    transition: TRANSITION_TIME
  },
  slide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '100%',
    minHeight: 100,
    transition: TRANSITION_TIME
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    transition: TRANSITION_TIME
  }
});

const isFirstSlide = (translateValue: number) => translateValue === 0;

const isLastSlide = (
  translateValue: number
) => translateValue === (-100 * (NUMBER_OF_SLIDES - 1));

function MailingListForm({ classes }: WithStyles<typeof styles>) {
  const [email, setEmail] = useState('');
  const [events, setEvents] = useState<EVENT[]>([]);
  const [feedback, setFeedback] = useState('');
  const [translateValue, setTranslateValue] = useState(0);

  const goLeft = () => {
    setTranslateValue(translateValue + 100);
  }

  const goRight = () => {
    setTranslateValue(translateValue - 100);
  }

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <img
          className={classes.logo}
          src='/assets/logo.jpg'
          alt='ACS Logo'
        />
      </div>

      <div className={classes.slider}>
        <div
          className={classes.slide}
          style={{ transform: `translateX(${translateValue}%)`}}
        >
          <EmailSlide
            email={email}
            setEmail={setEmail}
          />
        </div>
        <div
          className={classes.slide}
          style={{ transform: `translateX(${translateValue}%)`}}
        >
          <FeedbackSlide
            events={events}
            setEvents={setEvents}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        </div>
        <div
          className={classes.slide}
          style={{ transform: `translateX(${translateValue}%)`}}
        >
          <SocialSlide />
        </div>
      </div>

      <div
        className={classes.buttonContainer}
        style={!isFirstSlide(translateValue) ? {width: '100%'} : {}}
      >
        {!isFirstSlide(translateValue) && !isLastSlide(translateValue) && (
          <Button onClick={goLeft} className={classes.button}>
            <NavigateBeforeIcon />
            Back
          </Button>
        )}
        {!isLastSlide(translateValue) && (
          <Button onClick={goRight} className={classes.button}>
            {translateValue === (-100 * (NUMBER_OF_SLIDES - 2)) ? 'Submit' : 'Next'}
            <NavigateNextIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(MailingListForm);
