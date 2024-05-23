import { useWalletContext } from "@/providers/ProviderWalletContext";
import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import React from "react";
import SoundOnIcon from "@/public/assets/generals/sound_on.svg";
import SoundOffIcon from "@/public/assets/generals/sound_off.svg";

const ToggleSound = ({ ...sx }: ButtonProps) => {
  const { sound, handleToggleSound } = useWalletContext();
  return (
    <>
      <Button
        variant="icon_btn"
        {...sx}
        onClick={async () => {
          handleToggleSound();
        }}
      >
        <Icon as={sound ? SoundOnIcon : SoundOffIcon} height={6} width={6} />
      </Button>
    </>
  );
};

export default ToggleSound;
