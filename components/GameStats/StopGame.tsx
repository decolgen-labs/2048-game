import React, { useContext } from "react";
import StopIcon from "@/public/assets/generals/stop.svg";
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { GameContext } from "@/context/game-context";
const StopGame = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { score } = useContext(GameContext);
  return (
    <>
      {score > 0 && (
        <>
          <Button
            variant="icon_btn"
            onClick={async () => {
              onOpen();
            }}
          >
            <Icon as={StopIcon} height={6} width={6} />
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody>dsas</ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default StopGame;
