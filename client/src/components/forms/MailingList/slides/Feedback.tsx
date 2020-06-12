import React, { Dispatch, SetStateAction } from 'react';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core';
import { EVENT } from '../types';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(2),
    },
    text: {
      color: theme.palette.text.primary,
    },
    eventsContainer: {
      marginBottom: theme.spacing(3),
    },
    feedback: {
      width: '90%',
    },
  });

interface Props extends WithStyles<typeof styles> {
  events: EVENT[];
  setEvents: Dispatch<SetStateAction<EVENT[]>>;
  feedback: string;
  setFeedback: Dispatch<SetStateAction<string>>;
}

function Feedback({
  classes,
  events,
  setEvents,
  feedback,
  setFeedback,
}: Props) {
  const toggleEvent = (event: EVENT) => {
    const index = events.indexOf(event);
    if (index > -1) {
      events.splice(index, 1);
    } else {
      events.push(event);
    }
    setEvents(events);
  };

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <Typography variant="h4" className={classes.text}>
          What events are you interested in?
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {"Are there any ACS events that you're looking forward to this term?"}
        </Typography>
      </div>
      <div className={classes.eventsContainer}>
        {Object.values(EVENT).map((event) => (
          <FormGroup key={event}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={events.indexOf(event) > -1}
                  onChange={() => toggleEvent(event)}
                />
              }
              label={
                <Typography color="textPrimary" variant="body1">
                  {event}
                </Typography>
              }
            />
          </FormGroup>
        ))}
      </div>
      <div>
        <div className={classes.textContainer}>
          <Typography variant="h5" className={classes.text}>
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
      </div>
    </div>
  );
}

export default withStyles(styles)(Feedback);
