import React from "react";

import { useWalletContext } from "@/providers/ProviderWalletContext";

import { Button, Modal, VStack } from "@chakra-ui/react";
import Image from "next/image";
import ConnectWallet from "@/components/ConnectWallet";

interface IProps {
  size: number;
  onChangeSize: (newSize: number) => void;
}
const StartScreen = ({}: IProps) => {
  const { sound, connectWallet, handleToggleSound } = useWalletContext();

  return (
    <>
      <VStack>
        <Button
          variant="icon_btn"
          sx={{
            position: "absolute",
            top: 0,
            right: "10px",
          }}
          onClick={async () => {
            handleToggleSound();
          }}
        >
          <img
            src={
              sound
                ? "/assets/generals/sound_off.svg"
                : "/assets/generals/sound_on.svg"
            }
            height={24}
            width={24}
          />
        </Button>
        <Image
          src="/assets/generals/2048_logo.svg"
          alt="2048 Logo"
          width={224}
          height={72}
        />

        <ConnectWallet />
      </VStack>
    </>
  );
};

export default StartScreen;
