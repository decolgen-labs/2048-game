"use client";
import { useWalletContext } from "@/providers/ProviderWalletContext";
import React, { useEffect, useRef } from "react";
import StartScreen from "./StartScreen/StartScreen";

import PlayScreen from "./PlayScreen";
import { Box } from "@chakra-ui/react";
export type Configuration = {
  bestScore: number;
  size: number;
};
export const APP_NAME = "starkarcade-2048";
const GameScreen = () => {
  const { address, sound } = useWalletContext();
  const tickRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (tickRef.current) {
      if (sound) {
        tickRef.current.volume = 1;
        tickRef.current.play();
      } else {
        tickRef.current.volume = 0;
        console.log("Turn OFF", sound);
      }
    }
  }, [sound, tickRef]);
  return (
    <Box height="100vh">
      {address ? (
        <PlayScreen />
      ) : (
        <StartScreen size={4} onChangeSize={() => {}} />
      )}
      <video
        autoPlay
        loop
        muted
        preload="auto"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          zIndex: -1,
        }}
      >
        <source src="/assets/video/bg_motion.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Box
        position="absolute"
        bottom={0}
        left={0}
        backgroundImage={"url(/assets/arts/bg_bottom.svg)"}
        height="400px"
        width="full"
        backgroundSize="cover"
        backgroundPosition="center"
        objectFit="contain"
        backgroundRepeat="no-repeat"
        zIndex={-1}
      />
      <audio
        autoPlay={sound}
        loop
        src="/assets/sounds/bg_music.mp3"
        ref={tickRef}
      />
    </Box>
  );
};

export default GameScreen;
