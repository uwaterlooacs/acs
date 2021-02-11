import { styled, Theme } from '@material-ui/core/styles';

type SpacerProps = {
  width?: number;
  height?: number;
};

const Spacer = styled('span')<Theme, SpacerProps>({
  display: 'inline-block',
  width: ({ width = 1 }) => width,
  height: ({ height = 1 }) => height,
});

export default Spacer;
