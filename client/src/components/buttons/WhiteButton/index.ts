import { Button, withStyles } from '@material-ui/core';

const ColorButton = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: theme.palette.getContrastText(theme.palette.background.default),
    backgroundColor: theme.palette.background.default,
    border: '1px solid',
    borderRadius: 8,
    borderColor: theme.palette.getContrastText(
      theme.palette.background.default,
    ),
    '&:hover, &.hover': {
      color: theme.palette.getContrastText(theme.palette.text.primary),
      backgroundColor: theme.palette.text.primary,
    },
  },
}))(Button);

export default ColorButton;
