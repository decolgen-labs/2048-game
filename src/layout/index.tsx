'use client';
import PlayScreen from './PlayScreen/PlayScreen';
const MainScreen = () => {
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
        <source src="/video/bg_motion.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <PlayScreen />
      <div className="asset-bg " />
    </div>
  );
};

export default MainScreen;
