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
      <GameProvider>
        <ChakraProvider theme={theme}>
          <ProviderWalletContext>{children}</ProviderWalletContext>
        </ChakraProvider>
      </GameProvider>
    </ProviderStarknet>
  );
};

export default ProviderApp;
