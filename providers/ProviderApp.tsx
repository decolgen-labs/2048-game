"use client";
import { PropsWithChildren } from "react";
import ProviderStarknet from "./ProviderStarknet";
import ProviderWalletContext from "./ProviderWalletContext";

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderStarknet>
      <ProviderWalletContext>{children}</ProviderWalletContext>
    </ProviderStarknet>
  );
};

export default ProviderApp;
