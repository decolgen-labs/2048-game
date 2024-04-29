'use client';
import { useWalletContext } from '@/providers/ProviderWalletContext';
import PlayScreen from './PlayScreen/PlayScreen';
import StartScreen from './StartScreen/StartScreen';
const MainScreen = () => {
  const { address } = useWalletContext();
  console.log('What Wrong', address);
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          zIndex: -1,
        }}
      >
        <source src="/assets/video/bg_motion.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {address ? <PlayScreen /> : <StartScreen />}
      <div className="asset-bg " />
    </div>
  );
};

export default MainScreen;
