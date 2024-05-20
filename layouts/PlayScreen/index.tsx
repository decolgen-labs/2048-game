"use client";

import GameBoard from "@/components/GameBoard";

import Score from "@/components/score";
import styles from "@/styles/index.module.css";
import { VStack } from "@chakra-ui/react";
const PlayScreen = () => {
  return (
    <div className={styles.twenty48}>
      <Score />
      <VStack>
        <GameBoard />
      </VStack>
    </div>
  );
};

export default PlayScreen;
