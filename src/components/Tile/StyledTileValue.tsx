import styled from 'styled-components';
import { pop, expand } from '../../utils/animation';
import { getTileColor } from '../../utils/common';

export interface StyledTileValueProps {
  isNew: boolean;
  isMerging: boolean;
  value: number;
}

const StyledTileValue = styled.div<StyledTileValueProps>`
  width: 100%;
  height: 100%;
  font-size: inherit;
  font-weight: 900;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme: { palette }, value }) =>
    palette[getTileColor(value)]};
  animation-name: ${({ isMerging, isNew }) =>
    isMerging ? pop : isNew ? expand : ''};
  animation-duration: 0.18s;
  animation-fill-mode: forwards;
  color: ${({ theme: { palette } }) => palette.white};
  user-select: none;
  border: 1px solid
    ${({ theme: { borderColor }, value }) => borderColor[getTileColor(value)]};
`;

export default StyledTileValue;
