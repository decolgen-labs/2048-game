import {
  Box,
  Button,
  Text,
  Icon,
  useDisclosure,
  ButtonProps,
} from "@chakra-ui/react";

import ModalConnectWallet from "./ModalConnectWallet";

import StarknetIcon from "@/public/assets/generals/stark.svg";

const ConnectWallet = ({ sx }: { sx?: ButtonProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Button
          variant="connect_wallet"
          onClick={() => {
            onOpen();
          }}
          bg="#1B266B"
          borderRadius={{ md: "32px", base: "12px" }}
          gap={4}
          role="group"
          {...sx}
        >
          <Icon as={StarknetIcon} h={6} width={6} />
          <Text
            sx={{
              display: { md: "block", base: "none" },
            }}
          >
            Connect Wallet
          </Text>
        </Button>

        <ModalConnectWallet isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default ConnectWallet;
