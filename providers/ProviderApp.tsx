"use client";
import { PropsWithChildren } from "react";
import ProviderStarknet from "./ProviderStarknet";
import ProviderWalletContext from "./ProviderWalletContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/themes";
import GameProvider from "@/context/game-context";
import ProviderScript from "./ProviderScript";

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderStarknet>
      <ProviderWalletContext>
        <GameProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </GameProvider>
        <ProviderScript />
      </ProviderWalletContext>
    </ProviderStarknet>
  );
};

export default ProviderApp;
