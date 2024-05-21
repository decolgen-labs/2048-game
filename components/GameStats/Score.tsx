import { GameContext } from "@/context/game-context";
import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import BlockConner from "../BlockCorner";

const Score = () => {
  const { score } = useContext(GameContext);
  return (
    <Box
      flexDirection="column"
      position="relative"
      justifyContent="center"
      textAlign="center"
      bg="#007AC780;
"
      px={6}
    >
      <Text color="#3BF1FE">Score</Text>
      <Text color="#BDFBFF" fontWeight="bold" fontSize="lg">
        {score}
      </Text>
      <BlockConner top={0} left={0} rotate={0} />
      <BlockConner bottom={0} left={0} rotate={-90} />
      <BlockConner right={0} top={0} rotate={90} />
      <BlockConner bottom={0} right={0} rotate={180} />
    </Box>
  );
};

export default Score;
