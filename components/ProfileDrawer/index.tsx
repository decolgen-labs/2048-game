import { useWalletContext } from "@/providers/ProviderWalletContext";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { ellipseMiddle } from "@/utils/formatAddress";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Text,
  Box,
  Skeleton,
  Divider,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useBalance, useContractRead } from "@starknet-react/core";
import React, { useContext } from "react";
import CopyClipBoard from "../CopyClipBoard/CopyClipBoard";
import LogoutIcon from "@/public/assets/generals/logout.svg";
import RefreshIcon from "@/public/assets/generals/refresh.svg";
import ABIPoint from "@/abis/claim-point.json";
import { GameContext } from "@/context/game-context";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ProfileDrawer = ({ isOpen, onClose }: IProps) => {
  const { address, disconnectWallet } = useWalletContext();
  const { cleanGame } = useContext(GameContext);
  const { isLoading: isLoadingBalance, data: dataBalance } = useBalance({
    token: CONTRACT_ADDRESS.STRK,
    address: address ? address : "",
  });
  const {
    data: dataPoint,
    isLoading: isLoadingPoint,
    refetch: refetchDataPoint,
  } = useContractRead({
    functionName: "getUserPoint",
    abi: ABIPoint,
    args: [address ? address : ""],
    address: CONTRACT_ADDRESS.CLAIM_POINT,
    watch: true,
  });

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="primary.200">
          <DrawerCloseButton />

          <DrawerBody py={10} display="flex" flexDirection="column" gap={6}>
            <HStack
              bg="#1b266b"
              padding={4}
              fontWeight="800"
              borderRadius="8px"
            >
              <HStack width="fit-content" borderRight="2px solid" pr={2}>
                <Text>Your Point:</Text>
                <Box>
                  {!isLoadingPoint ? (
                    dataPoint?.toString()
                  ) : (
                    <Skeleton>00</Skeleton>
                  )}
                </Box>
              </HStack>
              <HStack width="fit-content">
                <Text>STRK:</Text>
                <Box>
                  {dataBalance && !isLoadingBalance ? (
                    parseFloat(dataBalance.formatted).toFixed(2)
                  ) : (
                    <Skeleton>0.00</Skeleton>
                  )}
                </Box>
              </HStack>
            </HStack>
            <Button
              onClick={async () => await refetchDataPoint()}
              leftIcon={<Icon as={RefreshIcon} />}
            >
              Refresh Data
            </Button>
            <HStack>
              <Text>{ellipseMiddle(address || "", 8, 8)}</Text>
              <CopyClipBoard aria-label="copy icon" context={address || ""} />
            </HStack>

            <Text opacity={0.5} userSelect="none">
              History
            </Text>
            <Text opacity={0.5} userSelect="none">
              LeaderBoard
            </Text>
            <Divider bg="gray.400" />

            <HStack
              cursor="pointer"
              _hover={{
                opacity: 0.8,
              }}
              onClick={async () => {
                disconnectWallet();
                cleanGame();
              }}
            >
              <Text fontSize="lg">Logout</Text>
              <Icon as={LogoutIcon} h={4} w={4} />
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
