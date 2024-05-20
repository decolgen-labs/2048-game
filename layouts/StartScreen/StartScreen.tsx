import Modal from "@/components/Modal";

import React from "react";

import { useWalletContext } from "@/providers/ProviderWalletContext";
import CloseButton from "@/components/Button/CloseButton";
import wallets from "@/config/wallet";

interface IProps {
  size: number;

  onChangeSize: (newSize: number) => void;
}
const StartScreen = ({}: IProps) => {
  const [isOpenConnectWallet, setIsOpenConnectWallet] = React.useState(false);

  const { sound, connectWallet, handleToggleSound } = useWalletContext();

  return (
    <>
      <button
        className="icon_btn"
        style={{
          position: "absolute",
          top: 0,
          right: "10px",
        }}
        onClick={async () => {
          handleToggleSound();
        }}
      >
        <img
          src={
            sound
              ? "/assets/generals/sound_off.svg"
              : "/assets/generals/sound_on.svg"
          }
          height={24}
          width={24}
        />
      </button>
      <img src="/assets/generals/2048_logo.svg" alt="2048 Logo" width={224} />

      <button
        onClick={() => {
          setIsOpenConnectWallet(true);
        }}
      >
        dsadas
      </button>
      <Modal
        isOpen={isOpenConnectWallet}
        onClose={() => {
          setIsOpenConnectWallet(false);
        }}
      >
        <div className="modal-connect-wallet">
          <p>Connect Wallet</p>
          <CloseButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              cursor: "pointer",
            }}
            onClose={() => {
              setIsOpenConnectWallet(false);
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {wallets.map((wallet) => (
              <button
                key={wallet.label}
                onClick={async () => {
                  await connectWallet(wallet.index);
                }}
                className="btn-connect-wallet"
              >
                <img src={wallet.icon} height={24} width={24} />
                <span>{wallet.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StartScreen;
