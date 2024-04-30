import Modal from '@/components/Modal';

import React from 'react';

import {
  StyleStartScreenWrapper,
  StyledBlockCorner,
  StyledStartScreen,
} from './StartScreen.styles';
import { useWalletContext } from '@/providers/ProviderWalletContext';
import CloseButton from '@/components/Button/CloseButton';
import wallets from '@/config/wallet';
import PlayButton from '@/components/Button/PlayButton';

import Control from '@/components/Control';
interface IProps {
  rows: number;
  cols: number;
  onChangeRows: (newRow: number) => void;
  onChangeCols: (newCol: number) => void;
}
const StartScreen = ({ onChangeCols, onChangeRows, rows, cols }: IProps) => {
  const [isOpenConnectWallet, setIsOpenConnectWallet] = React.useState(false);

  const { sound, connectWallet } = useWalletContext();

  return (
    <StyledStartScreen>
      <StyleStartScreenWrapper>
        <button
          className="icon_btn"
          style={{
            position: 'absolute',
            top: 0,
            right: '10px',
          }}
          onClick={async () => {
            // await dispatch(setSound(!sound));
          }}
        >
          <img
            src={
              sound
                ? '/assets/generals/sound_off.svg'
                : '/assets/generals/sound_on.svg'
            }
            height={24}
            width={24}
          />
        </button>
        <img src="/assets/generals/2048_logo.svg" alt="2048 Logo" />
        <Control
          rows={rows}
          cols={cols}
          onChangeCol={onChangeCols}
          onChangeRow={onChangeRows}
        />
        <PlayButton
          onClick={() => {
            setIsOpenConnectWallet(true);
          }}
        />
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
                position: 'absolute',
                top: 16,
                right: 16,
                cursor: 'pointer',
              }}
              onClose={() => {
                setIsOpenConnectWallet(false);
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
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
        <StyledBlockCorner top={0} left={0} rotate={0} />
        <StyledBlockCorner bottom={0} left={0} rotate={-90} />
        <StyledBlockCorner right={0} top={0} rotate={90} />
        <StyledBlockCorner bottom={0} right={0} rotate={180} />
      </StyleStartScreenWrapper>
    </StyledStartScreen>
  );
};

export default StartScreen;
