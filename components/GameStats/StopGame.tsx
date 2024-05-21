import React, { useContext, useMemo, useState } from "react";
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
import {
  InFoClaimPoint,
  claimPoint,
  getClaimPointInfo,
} from "@/config/socket_karas";
import { useAccount } from "@starknet-react/core";

import { CONTRACT_ADDRESS } from "@/utils/constants";
import { CallData } from "starknet";
const StopGame = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { score, startGame } = useContext(GameContext);
  const { account } = useAccount();
  console.log("ACCOUNT", account);
  const handleClaimPoint = async () => {
    try {
      console.log("???? Current ", account);
      if (account != undefined) {
        console.log("???? Current 2 ", account);
        claimPoint();
        const data = await getClaimPointInfo();
        await account.execute([
          {
            contractAddress: CONTRACT_ADDRESS.CLAIM_POINT,
            entrypoint: "rewardPoint",
            calldata: CallData.compile({
              point: data.point,
              timestamp: data.timestamp,
              proof: data.proof,
            }),
          },
        ]);
        startGame();
        onClose();
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };
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
            <ModalContent bg="primary.200">
              <ModalBody>
                <Button
                  onClick={async () => {
                    await handleClaimPoint();
                  }}
                >
                  Claim Point
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default StopGame;
