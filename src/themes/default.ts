import { BorderPalette, Palette, Theme } from './types';

export const defaultPalette: Palette = {
  transparent: 'transparent',
  black: '#000000',
  white: '#ffffff',
  primary: '#776e65',
  secondary: 'rgba(22, 22, 22, 0.8)', // background play
  tertiary: 'rgba(86, 86, 86, 0.8)', // background teri title
  foreground: '#ffffff',
  background: '#ffffff',
  backdrop: 'rgba(86, 86, 86, 0.8)',
  tile2: 'linear-gradient(180deg, #FA4293 0%, #DB0371 100%)',
  tile4: 'linear-gradient(180deg, #D942E2 0%, #9502B9 100%)',
  tile8: 'linear-gradient(180deg, #C49BFE 0%, #5814C5 100%)',
  tile16: 'linear-gradient(180deg, #55E6EF 0%, #10C0AB 100%)',
  tile32: 'linear-gradient(180deg, #25D5A3 0%, #04767F 100%)',
  tile64: 'linear-gradient(180deg, #61DD31 0%, #29A50E 100%)',
  tile128: 'linear-gradient(180deg, #CDFE3E 0%, #86E400 100%)',
  tile256: 'linear-gradient(180deg, #FFB81E 0%, #F9740C 100%)',
  tile512: 'linear-gradient(180deg, #F1302C 0%, #CC0622 100%)',
  tile1024: 'linear-gradient(180deg, #2C91EF 0%, #0C20D1 100%)',
  tile2048: 'linear-gradient(180deg, #2A78EE 0%, #0FD4C8 100%)',
};
//background: linear-gradient(180deg, #2A78EE 0%, #0FD4C8 100%);
export const borderColor: BorderPalette = {
  tile2: 'rgba(251, 115, 167, 1)',
  tile4: 'rgba(225, 115, 225, 1)',
  tile8: 'rgba(171, 132, 237, 1)',
  tile16: 'rgba(126, 236, 243, 1)',
  tile32: 'rgba(113, 203, 185, 1)',
  tile64: 'rgba(165, 237, 103, 1)',
  tile128: 'rgba(225, 255, 105, 1)',
  tile256: 'rgba(254, 216, 54, 1)',
  tile512: 'rgba(252, 94, 120, 1)',
  tile1024: 'rgba(94, 110, 252, 1)',
  tile2048: 'rgba(94, 233, 252, 1)',
};
const theme: Theme = {
  borderRadius: '3px',
  palette: defaultPalette,
  borderColor: borderColor,
};

export default theme;
