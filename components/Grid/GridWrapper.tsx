import { createIndexArray } from "@/utils/calculate";
import { Box } from "@chakra-ui/react";
import React, { useMemo } from "react";
import Cell from "./Cell";
import { convertHex } from "@/utils/convertHex";
interface IProps {
  rows: number;
  cols: number;
  width: number;
  height: number;
  spacing: number;
  children?: React.ReactNode;
}
const GridWrapper = ({
  rows,
  cols,
  width,
  height,
  spacing,
  children,
}: IProps) => {
  const Cells = useMemo(() => {
    const cells = createIndexArray(rows * cols);
    return cells.map((c) => <Cell key={c} />);
  }, [rows, cols]);

  return (
    <Box
      boxSizing="border-box"
      background={convertHex("#161616", 0.8)}
      width={width}
      height={height}
      display="grid"
      padding={spacing}
      gridTemplateColumns={`repeat(${cols}, 1fr)`}
      gridTemplateRows={`repeat(${rows}, 1fr)`}
      gap={spacing}
    >
      {Cells}
      {children}
    </Box>
  );
};

export default GridWrapper;
