import Box from '@/components/Box';

import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import useGameBoard from '@/hooks/useGameBoard';
import useGameScore from '@/hooks/useGameScore';
import useGameState, { GameStatus } from '@/hooks/useGameState';
import useLocalStorage from '@/hooks/useLocalStorage';

import { ThemeName } from '@/themes/types';
import { GRID_SIZE, MIN_SCALE, SPACING } from '@/utils/constants';
import { canGameContinue, isWin } from '@/utils/rules';
import { FC, useCallback, useEffect } from 'react';

import { APP_NAME } from '@/themes/constants';
export type Configuration = {
  theme: ThemeName;
  bestScore: number;
  rows: number;
  cols: number;
};

const PlayScreen: FC = () => {
  const [gameState, setGameStatus] = useGameState({
    status: 'running',
    pause: false,
  });

  const [config, setConfig] = useLocalStorage<Configuration>(APP_NAME, {
    theme: 'default',
    bestScore: 0,
    rows: MIN_SCALE,
    cols: MIN_SCALE,
  });

  const { total, best, addScore, setTotal } = useGameScore(config.bestScore);

  const { tiles, grid, onMove, onMovePending, onMergePending } = useGameBoard({
    rows: config.rows,
    cols: config.cols,
    gameState,
    addScore,
  });

  const onResetGame = useCallback(() => {
    setGameStatus('restart');
  }, [setGameStatus]);

  const onCloseNotification = useCallback(
    (currentStatus: GameStatus) => {
      setGameStatus(currentStatus === 'win' ? 'continue' : 'restart');
    },
    [setGameStatus],
  );

  if (gameState.status === 'restart') {
    setTotal(0);
    setGameStatus('running');
  } else if (gameState.status === 'running' && isWin(tiles)) {
    setGameStatus('win');
  } else if (gameState.status !== 'lost' && !canGameContinue(grid, tiles)) {
    setGameStatus('lost');
  }

  useEffect(() => {
    setGameStatus('restart');
  }, [setGameStatus]);
  // useEffect(() => {
  //   setConfig({ rows, cols, bestScore: best, theme: 'default' });
  // }, [rows, cols, best, setConfig]);

  return (
    <Box
      justifyContent="center"
      inlineSize="100%"
      blockSize="100%"
      alignItems="start"
      borderRadius={0}
    >
      <Box
        justifyContent="center"
        flexDirection="column"
        inlineSize={`${GRID_SIZE}px`}
      >
        <Box
          inlineSize="100%"
          justifyContent="space-between"
          marginBlockStart="s2"
        >
          <ScoreBoard total={total} title="score" />
          <ScoreBoard total={best} title="best" />
        </Box>
        <Box marginBlockStart="s2" marginBlockEnd="s6" inlineSize="100%"></Box>
        <GameBoard
          tiles={tiles}
          boardSize={GRID_SIZE}
          rows={config.rows}
          cols={config.cols}
          spacing={SPACING}
          gameStatus={gameState.status}
          onMove={onMove}
          onMovePending={onMovePending}
          onMergePending={onMergePending}
          onCloseNotification={onCloseNotification}
        />
      </Box>
    </Box>
  );
};

export default PlayScreen;
