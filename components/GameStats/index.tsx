import { HStack } from "@chakra-ui/react";
import React from "react";
import Score from "./Score";
import ToggleSound from "./ToggleSound";
import ResetGame from "./ResetGame";
import AccountSetting from "./AccountSetting";
import StopGame from "./StopGame";

const GameStats = () => {
  return (
    <HStack gap={1}>
      <Score />
      <StopGame />
      <ResetGame />
      <AccountSetting />
      <ToggleSound />
    </HStack>
  );
};

export default GameStats;
