import React from "react";

import { useWalletContext } from "@/providers/ProviderWalletContext";

import { Box, Button, Icon, VStack } from "@chakra-ui/react";
import Image from "next/image";
import ConnectWallet from "@/components/ConnectWallet";
import { convertHex } from "@/utils/convertHex";
import { colors } from "@/themes";
import BlockConner from "@/components/BlockCorner";
import SoundOnIcon from "@/public/assets/generals/sound_on.svg";
import SoundOffIcon from "@/public/assets/generals/sound_off.svg";
interface IProps {
  size: number;
  onChangeSize: (newSize: number) => void;
}
const StartScreen = ({}: IProps) => {
  const { sound, handleToggleSound } = useWalletContext();

  return (
    <VStack height="full" justifyContent="center">
      <Box
        as={VStack}
        border="1px solid rgba(0, 122, 199, 0.5)"
        padding={8}
        py={20}
        width={"400px"}
        position="relative"
        background={convertHex(colors.primary[100], 0.5)}
      >
        <Button
          variant="icon_btn"
          sx={{
            position: "absolute",
            top: 5,
            right: "10px",
          }}
          onClick={async () => {
            handleToggleSound();
          }}
        >
          <Icon as={sound ? SoundOnIcon : SoundOffIcon} height={6} width={6} />
        </Button>
        <Image
          src="/assets/generals/2048_logo.svg"
          alt="2048 Logo"
          width={224}
          height={72}
        />

        <ConnectWallet />

        <BlockConner top={0} left={0} rotate={0} />
        <BlockConner bottom={0} left={0} rotate={-90} />
        <BlockConner right={0} top={0} rotate={90} />
        <BlockConner bottom={0} right={0} rotate={180} />
      </Box>
    </VStack>
  );
};

export default StartScreen;
