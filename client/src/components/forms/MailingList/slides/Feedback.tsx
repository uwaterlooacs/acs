import { /*type*/ Dispatch, SetStateAction, Ref } from 'react';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ Event } from 'components/forms/MailingList/events';

import React, { forwardRef } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core';
import EVENTS from 'components/forms/MailingList/events';

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
    },
  });

interface Props extends WithStyles<typeof styles> {
  theme: Theme;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  feedback: string;
  setFeedback: Dispatch<SetStateAction<string>>;
}

function Feedback(
  { classes, theme, events, setEvents, feedback, setFeedback }: Props,
  ref: Ref<HTMLDivElement>,
) {
  const toggleEvent = (event: Event) => {
    const index = events.indexOf(event);
    if (index > -1) {
      setEvents(events.filter((e) => e.title !== event.title));
    } else {
      setEvents([...events, event]);
    }
  };

  return (
    <div className={classes.container} ref={ref}>
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
      <div>
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
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(forwardRef(Feedback));
