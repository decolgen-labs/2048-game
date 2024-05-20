import { axiosHandlerNoBearer } from "@/config/axios";
import { cancelGame, socketGame2048 } from "@/config/socket_karas";
import useSessionStorage from "@/hooks/useSessionStorage";
import { ACCESS_TOKEN, RPC_VALUE } from "@/utils/constants";

import { deleteCookie, setCookie } from "@/utils/cookie";

import { useAccount, useConnect } from "@starknet-react/core";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
interface IWalletConnectionProps {
  connectWallet: (index: number) => void;
  disconnectWallet: () => void;
  handleToggleSound: () => void;
  address?: string;
  sound: boolean; // turn on or off
  chain_id?: number; // SNIPPET chain ID is Argentx or Bravoos;
}
const initalValue: IWalletConnectionProps = {
  connectWallet: () => {},
  disconnectWallet: () => {},
  handleToggleSound: () => {},
  sound: false,
  address: "",
  chain_id: 0,
};
interface Configuration {
  address?: string;
  chain_id?: number;
  sound: boolean;
}
export const WalletContext = createContext<IWalletConnectionProps>(initalValue);

const ProviderWalletContext = ({ children }: PropsWithChildren) => {
  const { address: addressWallet, status: statusWallet } = useAccount();

  const [config, setConfig] = useSessionStorage<Configuration>(
    "stark_2048_wallet",
    {
      address: undefined,
      chain_id: undefined,
      sound: false,
    },
  );
  const [address, setAddress] = React.useState(config.address);
  const [chain_id, setChainId] = React.useState(config.chain_id);

  const [sound, setSound] = React.useState(config.sound);
  const { connect, connectors, connector } = useConnect();
  // When User finish Connect => Start new Game => Create Board

  /// Custom
  const connectWallet = async (index: number) => {
    await connect({ connector: connectors[index] });

    try {
      const currentAccount = await connector?.account();
      if (currentAccount?.address) {
        const { data: dataSignMessage } = await axiosHandlerNoBearer.get(
          "/authentication/get-nonce",
          {
            params: {
              address: currentAccount.address,
            },
          },
        );

        const signature = await currentAccount.signMessage(
          dataSignMessage.data.signMessage,
        );

        const { data: dataToken } = await axiosHandlerNoBearer.post(
          "/authentication/token",
          {
            address: currentAccount.address,
            signature: signature,
            rpc: RPC_VALUE.RPC_MAINET,
          },
        );

        setChainId(index);
        setCookie({
          expires: "1d",
          key: ACCESS_TOKEN,
          value: dataToken.data.token,
        });

        socketGame2048.on("connect", () => {
          console.log("Connected to the server");
        });
      }
    } catch (error) {}
  };

  const handleToggleSound = async () => {
    setSound(() => !sound);
  };
  const disconnectWallet = () => {
    setConfig({ address: undefined, chain_id: undefined, sound: true });
    cancelGame();
    setAddress(undefined);
    setChainId(undefined);
    deleteCookie(ACCESS_TOKEN);
  };
  useEffect(() => {
    if (addressWallet && addressWallet !== address && chain_id != undefined) {
      setAddress(addressWallet);
      setConfig({ ...config, address: addressWallet, chain_id: chain_id });
    }
  }, [addressWallet, chain_id]);
  useEffect(() => {
    const handleReConenct = async () => {
      if (address && statusWallet === "disconnected" && chain_id != undefined) {
        try {
          await connect({ connector: connectors[chain_id] });
        } catch (error) {
          await disconnectWallet();
        }
      }
    };
    handleReConenct();
  }, [address, chain_id]);

  return (
    <WalletContext.Provider
      value={{
        sound,
        address,
        chain_id,
        connectWallet,
        disconnectWallet,
        handleToggleSound,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error(
      "useWalletContext must be used within a ProviderWalletContext",
    );
  }
  return context;
};
export default ProviderWalletContext;
