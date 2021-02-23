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
  IconButton,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import { VOTING_STAGE } from '@acs/shared';

const useStyles = makeStyles({
  card: {
    height: 500,
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
  video?: string;
  writeUp?: string;
  stage: VOTING_STAGE;
  isDisabled: boolean;
  handleClick: () => Promise<void>;
  handleDelete?: () => Promise<void>;
};

const NominationCard: React.FC<Props> = ({
  firstName,
  lastName,
  semester,
  faculty,
  video,
  writeUp,
  stage,
  isDisabled,
  handleClick,
  handleDelete,
}) => {
  const classes = useStyles();
  const primaryButtonActionText =
    stage === VOTING_STAGE.Nomination ? 'Second Nomination' : 'Vote';
  const primaryButtonDisabledText =
    stage === VOTING_STAGE.Nomination ? 'Nomination Seconded' : 'Vote Cast';

  return (
    <Card className={classes.card}>
      <Box display="flex" flexDirection="column" height="100%">
        {video && (
          <CardMedia
            className={classes.video}
            component="video"
            title={`${firstName} ${lastName} video submission`}
            src={video}
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
          {handleDelete && (
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          )}
        </CardActions>
      </Box>
    </Card>
  );
};

export default NominationCard;
