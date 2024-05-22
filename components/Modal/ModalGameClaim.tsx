import {
  InFoClaimPoint,
  claimPoint,
  getClaimPointInfo,
} from "@/config/socket_karas";
import { Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// Claim When Game Lost Or Win
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalGameClaim = ({ isOpen, onClose }: IProps) => {
  const [pointData, setPointData] = useState<InFoClaimPoint>(undefined);

  useEffect(() => {
    const handleLoadPoint = async () => {
      if (isOpen) {
        claimPoint();
        const data = await getClaimPointInfo();
        setPointData(data);
      }
    };
    handleLoadPoint();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Text>You Lose</Text>
        <Text>{pointData?.point}</Text>
      </ModalContent>
    </Modal>
  );
};

export default ModalGameClaim;
