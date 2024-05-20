import { GameContext } from "@/context/game-context";
import { MAX_SIZE_BOARD, MIN_SIZE_BOARD } from "@/themes/constants";
import { Box, Text, useNumberInput } from "@chakra-ui/react";
import React, { useContext } from "react";

const ConfigSize = () => {
  const { configNewSize } = useContext(GameContext);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: MIN_SIZE_BOARD,
      max: MAX_SIZE_BOARD,
      onChange: (value) => {
        // configNewSize(value);
        console.log("");
      },
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Box>
      <Text>Size</Text>
    </Box>
  );
};

export default ConfigSize;
