import { /*type*/ Dispatch, SetStateAction } from 'react';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ Event } from 'components/forms/MailingList/events';

import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import EVENTS from 'components/forms/MailingList/events';

const TRANSITION_TIME = '0.5s';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '90%',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(2),
    },
    eventsContainer: {
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    eventContainer: {
      marginBottom: theme.spacing(1),
    },
    feedback: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    button: {
      transition: TRANSITION_TIME,
    },
    progressContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
    },
    progress: {
      color: theme.palette.success.main,
    },
  });

interface Props extends WithStyles<typeof styles> {
  theme: Theme;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  feedback: string;
  setFeedback: Dispatch<SetStateAction<string>>;
  goLeft: () => void;
  submit: () => Promise<void>;
}

function Feedback({
  classes,
  theme,
  events,
  setEvents,
  feedback,
  setFeedback,
  goLeft,
  submit,
}: Props) {
  const [loading, setLoading] = useState(false);

  const toggleEvent = (event: Event) => {
    const index = events.indexOf(event);
    if (index > -1) {
      setEvents(events.filter((e) => e.title !== event.title));
    } else {
      setEvents([...events, event]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await submit();
  };

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <Typography variant="h4" color="textPrimary">
          What events are you interested in?
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {"Are there any ACS events that you're looking forward to this term?"}
        </Typography>
      </div>
      <div className={classes.eventsContainer}>
        {EVENTS.map((event) => (
          <FormGroup key={event.title}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={events.indexOf(event) > -1}
                  onChange={() => toggleEvent(event)}
                  style={{ color: theme.palette.success.main }}
                />
              }
              label={
                <div className={classes.eventContainer}>
                  <Typography color="textPrimary" variant="body1">
                    {event.title}
                  </Typography>
                  <Typography color="textPrimary" variant="body2">
                    {event.description}
                  </Typography>
                </div>
              }
            />
          </FormGroup>
        ))}
      </div>
      <div className={classes.textContainer}>
        <Typography variant="h5" color="textPrimary">
          Are there any other events that you would like to happen this term?
        </Typography>
      </div>
      <TextField
        className={classes.feedback}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        type="text"
        label="Feedback"
        variant="outlined"
        multiline
      />
      <div className={classes.buttonContainer}>
        <Button onClick={goLeft} className={classes.button}>
          <NavigateBeforeIcon />
          Back
        </Button>
        <Button onClick={handleSubmit} className={classes.button}>
          Submit
          <NavigateNextIcon />
        </Button>
      </div>
      {loading && (
        <div className={classes.progressContainer}>
          <CircularProgress className={classes.progress} />
        </div>
      )}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Feedback);
