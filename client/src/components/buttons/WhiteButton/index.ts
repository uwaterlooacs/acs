import { Button, withStyles } from '@material-ui/core';
import { common } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    border: '1px solid',
    borderRadius: 8,
    borderColor: theme.palette.getContrastText(common.white),
    '&:hover, &.hover': {
      color: theme.palette.getContrastText(common.black),
      backgroundColor: common.black,
    },
  },
}))(Button);

export default ColorButton;
