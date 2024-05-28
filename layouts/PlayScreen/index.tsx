"use client";

import GameBoard from "@/components/GameBoard";
import Image from "next/image";

import { Flex, VStack } from "@chakra-ui/react";
import GameStats from "@/components/GameStats";
const PlayScreen = () => {
  return (
    <>
      <VStack height="100vh" justifyContent="center">
        <Flex flexDirection="column" gap={3}>
          <GameStats />
          <GameBoard />
        </Flex>
        <Image
          src="/assets/generals/2048_logo.svg"
          alt="2048 Logo"
          width={400}
          height={120}
        />
      </VStack>
    </>
  );
};

export default PlayScreen;
