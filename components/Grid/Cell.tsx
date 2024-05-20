import { convertHex } from "@/utils/convertHex";
import { Box } from "@chakra-ui/react";
import React from "react";

const Cell = () => {
  return (
    <Box
      width="full"
      height="full"
      backgroundColor={convertHex("#242424", 0.8)}
    />
  );
};

export default Cell;
