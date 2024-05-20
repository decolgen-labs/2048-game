import {
  Box,
  Button,
  Text,
  Icon,
  useDisclosure,
  ButtonProps,
} from "@chakra-ui/react";

import ModalConnectWallet from "./ModalConnectWallet";
import BackgroudImage from "@/public/assets/btn/play_btn.svg";
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
          gap={2}
          role="group"
          {...sx}
        >
          <Icon as={StarknetIcon} h={5} width={5} />
          <Text fontSize="14px">{`Let's Stark`}</Text>
        </Button>

        <ModalConnectWallet isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default ConnectWallet;
