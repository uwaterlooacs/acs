import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CardMedia,
  makeStyles,
  Box,
} from '@material-ui/core';
import { VOTING_STAGE } from '@acs/shared';

const useStyles = makeStyles({
  card: {
    height: 550,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
  },
  video: {
    maxHeight: 250,
  },
  writeUp: {
    whiteSpace: 'pre-wrap',
  },
});

export type Props = {
  firstName: string;
  lastName: string;
  semester: string;
  faculty: string;
  videoUrl?: string;
  writeUp?: string;
  stage: VOTING_STAGE;
  isDisabled: boolean;
  handleClick(): Promise<void>;
};

const NominationCard: React.FC<Props> = ({
  firstName,
  lastName,
  semester,
  faculty,
  videoUrl,
  writeUp,
  stage,
  isDisabled,
  handleClick,
}) => {
  const classes = useStyles();
  const primaryButtonActionText =
    stage === VOTING_STAGE.Nomination ? 'Second Nomination' : 'Vote';
  const primaryButtonDisabledText =
    stage === VOTING_STAGE.Nomination ? 'Nomination Seconded' : 'Vote Cast';

  return (
    <Card className={classes.card}>
      <Box display="flex" flexDirection="column" height="100%">
        {videoUrl && (
          <CardMedia
            className={classes.video}
            component="video"
            title={`${firstName} ${lastName} video submission`}
            src={videoUrl}
            controls
          />
        )}
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h2">
            {firstName} {lastName}
          </Typography>
          <Typography variant="overline" color="textSecondary" gutterBottom>
            {semester} {faculty}
          </Typography>
          {writeUp && (
            <Box overflow="auto">
              <Typography className={classes.writeUp}>{writeUp}</Typography>
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="large"
            color="primary"
            onClick={handleClick}
            disabled={isDisabled}
          >
            {isDisabled ? primaryButtonDisabledText : primaryButtonActionText}
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default NominationCard;
