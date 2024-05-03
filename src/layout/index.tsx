'use client';
import { useWalletContext } from '@/providers/ProviderWalletContext';
import PlayScreen from './PlayScreen/PlayScreen';
import StartScreen from './StartScreen/StartScreen';
import { ThemeProvider } from 'styled-components';
import useLocalStorage from '@/hooks/useLocalStorage';
import { APP_NAME } from '@/themes/constants';
import { MIN_SCALE } from '@/utils/constants';
import useTheme from '@/hooks/useTheme';
import { ThemeName } from '@/themes/types';

import useScaleControl from '@/hooks/useScaleControl';
import { useEffect } from 'react';
export type Configuration = {
  theme: ThemeName;
  bestScore: number;
  rows: number;
  cols: number;
};
const MainScreen = () => {
  const { address } = useWalletContext();
  const [config, setConfig] = useLocalStorage<Configuration>(APP_NAME, {
    theme: 'default',
    bestScore: 0,
    rows: MIN_SCALE,
    cols: MIN_SCALE,
  });

  const [{ name: themeName, value: themeValue }] = useTheme(config.theme);
  const [rows, setRows] = useScaleControl(config.rows);
  const [cols, setCols] = useScaleControl(config.cols);
  useEffect(() => {
    setConfig({ ...config, rows, cols, theme: 'default' });
  }, [rows, cols, setConfig]);
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        preload="auto"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          zIndex: -1,
        }}
      >
        <source src="/assets/video/bg_motion.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <ThemeProvider theme={themeValue}>
        {address ? (
          <PlayScreen />
        ) : (
          <StartScreen
            cols={cols}
            rows={rows}
            onChangeCols={setCols}
            onChangeRows={setRows}
          />
        )}
      </ThemeProvider>

      <div className="asset-bg " />
    </div>
  );
};

export default MainScreen;
