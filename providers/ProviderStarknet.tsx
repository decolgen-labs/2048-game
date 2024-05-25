import { mainnet, sepolia } from "@starknet-react/chains";
import {
  InjectedConnector,
  StarknetConfig,
  jsonRpcProvider,
} from "@starknet-react/core";
import { PropsWithChildren } from "react";
import { ArgentMobileConnector } from "starknetkit/argentMobile";

const ProviderStarknet = ({ children }: PropsWithChildren) => {
  const connectors = [
    new InjectedConnector({ options: { id: "argentX", name: "Argent" } }),
    // new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new ArgentMobileConnector(),
  ];
  function rpc() {
    return {
      // nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
      // nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno",
      nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7",
    };
  }

  const provider = jsonRpcProvider({ rpc });
  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={provider}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
};

export default ProviderStarknet;
