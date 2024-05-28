import {
  InFoClaimPoint,
  claimPoint,
  getClaimPointInfo,
} from "@/config/socket_karas";
import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import StarIcon from "@/public/assets/arts/star.svg";
import ResetGame from "../GameStats/ResetGame";
import AccountSetting from "../GameStats/AccountSetting";
import { GameContext } from "@/context/game-context";
import { useAccount } from "@starknet-react/core";
import { CallData } from "starknet";
import { CONTRACT_ADDRESS } from "@/utils/constants";
// Claim When Game Lost Or Win
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalGameClaim = ({ isOpen, onClose }: IProps) => {
  const { score, startGame } = useContext(GameContext);
  const { account } = useAccount();
  const handleClaimPoint = async () => {
    try {
      if (account != undefined) {
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        background="none"
        minH={400}
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundImage="url('/assets/arts/modal_finish.svg')"
      >
        <ModalBody as={VStack}>
          <HStack mt={20} gap={4}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Icon
                as={StarIcon}
                h={12}
                width={12}
                key={index}
                transform={index == 1 ? "translateY(-20px)" : ""}
              />
            ))}
          </HStack>

          <Text fontSize="40px" fontWeight="bold">
            {score}
          </Text>
          <Text textTransform="uppercase" color="#FFB35B" fontWeight="bold">
            Point
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center" alignItems="center">
          <ResetGame />
          <Button
            onClick={async () => {
              await handleClaimPoint();
            }}
            variant="connect_wallet"
            sx={{
              maxWidth: "220px",
            }}
          >
            Claim Point
          </Button>
          <AccountSetting />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalGameClaim;
