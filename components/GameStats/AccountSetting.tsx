import React from "react";
import AccountIcon from "@/public/assets/generals/profile.svg";
import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import ProfileDrawer from "../ProfileDrawer";
const AccountSetting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="icon_btn" onClick={onOpen}>
        <Icon as={AccountIcon} height={6} width={6} />
      </Button>
      <ProfileDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AccountSetting;
