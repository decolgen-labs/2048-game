import React, { FC } from 'react';
import { MAX_SCALE, MIN_SCALE } from '../../utils/constants';
import Box from '../Box';
import Button from '../Button';
import Text from '../Text';

export interface ControlProps {
  rows: number;
  cols: number;
  onChangeRow: (newRow: number) => void;
  onChangeCol: (newCol: number) => void;
}

const Control: FC<ControlProps> = ({
  rows,
  cols,
  onChangeRow,
  onChangeCol,
}) => (
  <Box
    inlineSize="100%"
    justifyContent="center"
    style={{
      fontWeight: '900',
      background: 'rgba(7, 24, 35, 1)',
    }}
  >
    <Box marginInlineEnd="s6" flexDirection="column">
      <Text
        textTransform="uppercase"
        fontSize={13}
        style={{
          color: 'rgba(36, 71, 142, 1)',
        }}
      >
        rows
      </Text>
      <Box padding="s2">
        <Button
          mini
          onClick={() => onChangeRow(-1)}
          disable={rows === MIN_SCALE}
        >
          -
        </Button>
        <Box marginInline="s3">
          <Text
            fontSize={16}
            style={{
              color: 'rgba(64, 233, 241, 1)',
            }}
          >
            {rows}
          </Text>
        </Box>
        <Button
          mini
          onClick={() => onChangeRow(1)}
          disable={rows === MAX_SCALE}
        >
          +
        </Button>
      </Box>
    </Box>
    <Box flexDirection="column">
      <Text
        textTransform="uppercase"
        fontSize={13}
        style={{
          color: 'rgba(36, 71, 142, 1)',
        }}
      >
        cols
      </Text>
      <Box padding="s2">
        <Button
          mini
          onClick={() => onChangeCol(-1)}
          disable={cols === MIN_SCALE}
        >
          -
        </Button>
        <Box marginInline="s3">
          <Text
            fontSize={16}
            style={{
              color: 'rgba(64, 233, 241, 1)',
            }}
          >
            {cols}
          </Text>
        </Box>
        <Button
          mini
          onClick={() => onChangeCol(1)}
          disable={cols === MAX_SCALE}
        >
          +
        </Button>
      </Box>
    </Box>
  </Box>
);

export default React.memo(Control);
