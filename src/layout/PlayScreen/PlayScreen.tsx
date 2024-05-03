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
import { StyledBlockCorner } from '../StartScreen/StartScreen.styles';
import { useWalletContext } from '@/providers/ProviderWalletContext';
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
  const { disconnectWallet } = useWalletContext();
  return (
    <Box
      justifyContent="center"
      inlineSize="100%"
      blockSize="100%"
      style={{
        height: '100vh',
      }}
      alignItems="center"
      borderRadius={0}
    >
      <Box
        justifyContent="center"
        flexDirection="column"
        inlineSize={`${GRID_SIZE}px`}
      >
        <Box
          justifyContent="space-between"
          style={{
            width: '100%',
          }}
        >
          <Box position="relative" className="stat-rows">
            <ScoreBoard total={total} title="score" />
            <ScoreBoard total={best} title="best" />
            <StyledBlockCorner top={0} left={0} rotate={0} />
            <StyledBlockCorner bottom={0} left={0} rotate={-90} />
            <StyledBlockCorner right={0} top={0} rotate={90} />
            <StyledBlockCorner bottom={0} right={0} rotate={180} />
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              className="icon_btn"
              onClick={async () => {
                onResetGame();
              }}
            >
              <img
                src="/assets/generals/restart.svg"
                alt=""
                height={24}
                width={24}
              />
            </button>
            <button
              className="icon_btn"
              onClick={() => {
                disconnectWallet();
              }}
            >
              <img
                src="/assets/generals/profile.svg"
                alt=""
                height={24}
                width={24}
              />
            </button>
            <button className="icon_btn" onClick={async () => {}}>
              <img
                src="/assets/generals/sound_on.svg"
                alt=""
                height={24}
                width={24}
              />
            </button>
          </div>
        </Box>

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
        <img
          src="/assets/generals/2048_logo.svg"
          alt="2048 Play Logo"
          style={{
            marginTop: '40px',
          }}
        />
      </Box>
    </Box>
  );
};

export default PlayScreen;
