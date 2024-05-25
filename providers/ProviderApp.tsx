"use client";
import { PropsWithChildren } from "react";
import ProviderStarknet from "./ProviderStarknet";
import ProviderWalletContext from "./ProviderWalletContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/themes";
import GameProvider from "@/context/game-context";

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderStarknet>
      <ProviderWalletContext>
        <GameProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </GameProvider>
      </ProviderWalletContext>
    </ProviderStarknet>
  );
};

export default ProviderApp;
