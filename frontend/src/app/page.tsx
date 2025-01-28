import AudioChat from '@/components/AudioChat';
import './sky.scss';
export default function Home() {
  return (
    <div className="main-container">
      <div className="sub-container">
        <div className="sky">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
          <div className="comet"></div>
        </div>
      </div>
      <div className="absolute inset-0">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <AudioChat />
        </div>
      </div>
    </div>
  );
}