import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

export const background = {
  tile2: "linear-gradient(180deg, #FA4293 0%, #DB0371 100%)",
  tile4: "linear-gradient(180deg, #D942E2 0%, #9502B9 100%)",
  tile8: "linear-gradient(180deg, #C49BFE 0%, #5814C5 100%)",
  tile16: "linear-gradient(180deg, #55E6EF 0%, #10C0AB 100%)",
  tile32: "linear-gradient(180deg, #25D5A3 0%, #04767F 100%)",
  tile64: "linear-gradient(180deg, #61DD31 0%, #29A50E 100%)",
  tile128: "linear-gradient(180deg, #CDFE3E 0%, #86E400 100%)",
  tile256: "linear-gradient(180deg, #FFB81E 0%, #F9740C 100%)",
  tile512: "linear-gradient(180deg, #F1302C 0%, #CC0622 100%)",
  tile1024: "linear-gradient(180deg, #2C91EF 0%, #0C20D1 100%)",
  tile2048: "linear-gradient(180deg, #2A78EE 0%, #0FD4C8 100%)",
};

export const colors = {
  primary: {
    100: "#007AC7",
    200: "#0E2E5E",
    300: "#3BF1FE",
  },
  ...background,
};
const styles = {
  // eslint-disable-next-line no-unused-vars
  global: () => ({
    body: {
      bg: "#000",
      color: "#E4E8FF",
      boxSizing: "border-box",
    },
  }),
};
const Button: ComponentStyleConfig = {
  variants: {
    icon_btn: {
      cursor: "pointer",
      display: "flex",
      border: "none",
      width: "65px",
      height: "60px",
      alignItems: "center",
      justifyContent: "center",
      background: "url('/assets/btn/icon_btn.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "0.5s",
      _hover: {
        background: "url('/assets/btn/icon_btn_hover.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
    connect_wallet: {
      background: "url(/assets/btn/play_btn.svg)",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      color: "rgba(64, 233, 241, 1)",
      border: "none",
      fontWeight: 700,
      cursor: "pointer",
      transition: "0.3s",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.25rem",
      width: "100%",
      _hover: {
        background: "url(/assets/btn/play_btn_hover.svg)",
        backgroundPosition: "center",
        backgroundSize: "contain",
        objectFit: "contain",
        backgroundRepeat: "no-repeat",
      },
    },
  },
};
const theme = extendTheme({
  colors,
  styles,
  components: {
    Button,
  },
});

export default theme;
