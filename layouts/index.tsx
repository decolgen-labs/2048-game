"use client";
import { useWalletContext } from "@/providers/ProviderWalletContext";
import React from "react";
import StartScreen from "./StartScreen/StartScreen";
import useLocalStorage from "@/hooks/useLocalStorage";

import PlayScreen from "./PlayScreen";
export type Configuration = {
  bestScore: number;
  size: number;
};
export const APP_NAME = "starkarcade-2048";
const GameScreen = () => {
  const { address, sound } = useWalletContext();
  const [config, setConfig] = useLocalStorage<Configuration>(APP_NAME, {
    bestScore: 0,
    size: 4,
  });

  return (
    <>
      {address ? (
        <PlayScreen />
      ) : (
        <StartScreen size={4} onChangeSize={() => {}} />
      )}
    </>
  );
};

export default GameScreen;
