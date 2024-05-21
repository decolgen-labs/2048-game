import { axiosHandlerNoBearer } from "@/config/axios";
import { cancelGame, disconnectSocket } from "@/config/socket_karas";
import { GameContext } from "@/context/game-context";
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
import { io } from "socket.io-client";
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
  const {
    address: addressWallet,
    status: statusWallet,
    account,
  } = useAccount();
  const { startGame } = useContext(GameContext);
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

  /// Custom
  const connectWallet = async (index: number) => {
    await connect({ connector: connectors[index] });
    try {
      if (account) {
        const { data: dataSignMessage } = await axiosHandlerNoBearer.get(
          "/authentication/get-nonce",
          {
            params: {
              address: addressWallet,
            },
          },
        );

        const signature = await account.signMessage(
          dataSignMessage.data.signMessage,
        );

        const { data: dataToken } = await axiosHandlerNoBearer.post(
          "/authentication/token",
          {
            address: addressWallet,
            signature: signature,
            rpc: RPC_VALUE.RPC_MAINNET,
          },
        );
        setAddress(addressWallet);

        setConfig({
          ...config,
          address: addressWallet,
          chain_id: index,
        });

        setCookie({
          expires: "1d",
          key: ACCESS_TOKEN,
          value: dataToken.data.token,
        });
      }
    } catch (error) {
      console.log("ERROR", error);
    }
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
    disconnectSocket();
  };
  useEffect(() => {
    const handleChangeWallet = async () => {
      if (addressWallet && addressWallet !== address && chain_id != undefined) {
        cancelGame();
        await connectWallet(chain_id);
      }
    };
    handleChangeWallet();
  }, [addressWallet, address]);
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
  }, [statusWallet, addressWallet]);

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
