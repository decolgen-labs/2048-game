import { getTileColor, getTileFontSize } from "@/utils/calculate";
import { Box } from "@chakra-ui/react";
import React from "react";

interface IProps {
  value: number;
  height: number;
  width: number;
}

const Tile = ({ value, height, width }: IProps) => {
  return (
    <Box
      sx={{
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${getTileFontSize(width, height, value)}px`,
        fontWeight: 900,
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "center",
        animationDuration: "0.18s",
        animationFillMode: "forwards",
        userSelect: "none",
        background: value != 0 ? getTileColor(value) : "transparent",
        color: value > 0 ? "white" : "transparent",
      }}
    >
      {value}
    </Box>
  );
};

export default Tile;
