import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ Event } from 'components/forms/MailingList/events';

import React, { createRef, useEffect } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import EmailSlide from './slides/Email';
import FeedbackSlide from './slides/Feedback';
import SocialSlide from './slides/Social';

const LOGO_SIZE = 200;
const TRANSITION_TIME = '0.5s';
const NUMBER_OF_SLIDES = 3;

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 960,
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
      height: '100%',
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

const isFirstSlide = (translateValue: number) => translateValue === 0;

const isLastSlide = (translateValue: number) =>
  translateValue === -100 * (NUMBER_OF_SLIDES - 1);

const slideArr = new Array(NUMBER_OF_SLIDES).fill(null);
const slideRefs = slideArr.map(() => createRef<HTMLDivElement>());

function MailingListForm({ classes }: WithStyles<typeof styles>) {
  const [email, setEmail] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [feedback, setFeedback] = useState('');
  const [translateValue, setTranslateValue] = useState(0);

  const currentSlideIndex = (translateValue * -1) / 100;
  const currentSlide = slideRefs[currentSlideIndex].current;

  const [sliderHeight, setSliderHeight] = useState(145);

  const goLeft = () => {
    setTranslateValue(translateValue + 100);
  };

  const goRight = () => {
    setTranslateValue(translateValue - 100);
  };

  useEffect(() => {
    if (currentSlide) {
      setSliderHeight(currentSlide.offsetHeight);
    }
  }, [currentSlide]);

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src="/assets/logo.jpg" alt="ACS Logo" />
      </div>

      <div className={classes.slider} style={{ height: sliderHeight }}>
        {slideArr.map((s, index) => (
          <div
            key={index}
            className={classes.slide}
            style={{ transform: `translateX(${translateValue}%)` }}
          >
            {index === 0 && (
              <EmailSlide
                email={email}
                setEmail={setEmail}
                ref={slideRefs[index]}
              />
            )}
            {index === 1 && (
              <FeedbackSlide
                events={events}
                setEvents={setEvents}
                feedback={feedback}
                setFeedback={setFeedback}
                ref={slideRefs[index]}
              />
            )}
            {index === 2 && <SocialSlide ref={slideRefs[index]} />}
          </div>
        ))}
      </div>

      <div
        className={classes.buttonContainer}
        style={!isFirstSlide(translateValue) ? { width: '100%' } : {}}
      >
        {!isFirstSlide(translateValue) && !isLastSlide(translateValue) && (
          <Button onClick={goLeft} className={classes.button}>
            <NavigateBeforeIcon />
            Back
          </Button>
        )}
        {!isLastSlide(translateValue) && (
          <Button onClick={goRight} className={classes.button}>
            {translateValue === -100 * (NUMBER_OF_SLIDES - 2)
              ? 'Submit'
              : 'Next'}
            <NavigateNextIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(MailingListForm);
