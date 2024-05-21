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
} from "@chakra-ui/react";
import { useBalance } from "@starknet-react/core";
import React from "react";
import CopyClipBoard from "../CopyClipBoard/CopyClipBoard";
import LogoutIcon from "@/public/assets/generals/logout.svg";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ProfileDrawer = ({ isOpen, onClose }: IProps) => {
  const { address, disconnectWallet } = useWalletContext();
  const { isLoading: isLoadingBalance, data: dataBalance } = useBalance({
    token: CONTRACT_ADDRESS.STRK,
    address: address ? address : "",
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
