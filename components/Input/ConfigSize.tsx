import { GameContext } from "@/context/game-context";
import { useWalletContext } from "@/providers/ProviderWalletContext";
import { MAX_SIZE_BOARD, MIN_SIZE_BOARD } from "@/themes/constants";
import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import React from "react";

const ConfigSize = () => {
  const { configNewSize, size } = useWalletContext();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: size,
      min: MIN_SIZE_BOARD,
      max: MAX_SIZE_BOARD,
      onChange: (value) => {
        configNewSize(parseInt(value));
      },
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Box textAlign="center">
      <Text fontWeight="bold" color="#40E9F1">
        Size
      </Text>
      <HStack bg="#071823">
        <Button
          variant="unstyled"
          {...inc}
          color="#40E9F1"
          fontWeight="bold"
          fontSize="lg"
        >
          +
        </Button>
        <Input
          {...input}
          userSelect="none"
          border="none"
          isReadOnly
          sx={{
            width: "50px",
            color: "#40E9F1",
            fontWeight: "bold",
          }}
        />
        <Button
          variant="unstyled"
          {...dec}
          color="#40E9F1"
          fontWeight="bold"
          fontSize="lg"
        >
          -
        </Button>
      </HStack>
    </Box>
  );
};

export default ConfigSize;
