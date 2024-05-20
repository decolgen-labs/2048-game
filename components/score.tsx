import { GameContext } from "@/context/game-context";
import { Box } from "@chakra-ui/react";

import { useContext } from "react";

export default function Score() {
  const { score } = useContext(GameContext);

  return <Box>{score}</Box>;
}
