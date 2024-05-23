import React, { useContext } from "react";
import RestartIcon from "@/public/assets/generals/restart.svg";
import { Button, ButtonProps, Icon } from "@chakra-ui/react";

import { GameContext } from "@/context/game-context";
const ResetGame = ({ ...sx }: ButtonProps) => {
  const { startGame } = useContext(GameContext);
  return (
    <Button
      variant="icon_btn"
      {...sx}
      onClick={async () => {
        startGame();
      }}
    >
      <Icon as={RestartIcon} height={6} width={6} />
    </Button>
  );
};

export default ResetGame;
