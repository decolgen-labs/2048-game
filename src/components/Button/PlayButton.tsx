import { StyledPlayButton } from './Button.styles';

interface IProps {
  onClick: () => void;
}
const PlayButton = ({ onClick }: IProps) => {
  return (
    <StyledPlayButton onClick={onClick}>
      <image href="/assets/icons/stark.svg" height={24} width={24} />
      <span> {`Let's Stark`} </span>
    </StyledPlayButton>
  );
};

export default PlayButton;
