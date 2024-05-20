"use client";

import GameBoard from "@/components/GameBoard";
import Image from "next/image";
import Score from "@/components/score";

import { Flex, VStack } from "@chakra-ui/react";
const PlayScreen = () => {
  return (
    <>
      <VStack height="100vh" justifyContent="center">
        <Flex flexDirection="column">
          <Score />
          <GameBoard />
          <Image
            src="/assets/generals/2048_logo.svg"
            alt="2048 Logo"
            width={379}
            height={120}
          />
        </Flex>
      </VStack>
    </>
  );
};

export default PlayScreen;
