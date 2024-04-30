import { Palette, Theme } from './types';

export const defaultPalette: Palette = {
  transparent: 'transparent',
  black: '#000000',
  white: '#ffffff',
  primary: '#776e65',
  secondary: 'rgba(50, 50, 50, 0.8)', // background play
  tertiary: 'rgba(86, 86, 86, 0.8)', // background teri title
  foreground: '#ffffff',
  background: '#ffffff',
  backdrop: 'rgba(86, 86, 86, 0.8)',
  tile2: '#E0E0E0',
  tile4: '#E0E0C0',
  tile8: '#80D5F0',
  tile16: '#60B4F0',
  tile32: '#5086F0',
  tile64: '#304FF0',
  tile128: '#8070E0',
  tile256: '#A860E0',
  tile512: '#CC50E0',
  tile1024: '#DC30E0',
  tile2048: '#E010D8',
};

const theme: Theme = {
  borderRadius: '3px',
  palette: defaultPalette,
};

export default theme;
