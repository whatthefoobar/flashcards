import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface FlashcardProps {
  front: string;
  back: string;
  audioUrl?: string;
}

const Flashcard = ({ front, back, audioUrl }: FlashcardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div
      className="relative w-full sm:w-72 md:w-80 lg:w-[600px] h-48 cursor-pointer border-2 border-red-500" // Fixed height for consistency
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`w-full h-full transition-transform duration-500 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 flex items-center justify-center bg-blue-500 text-white text-xl font-bold rounded-2xl shadow-lg backface-hidden">
          {front}
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-800 text-lg font-medium rounded-2xl shadow-lg transform rotate-y-180 backface-hidden">
          <p>{back}</p>
          {audioUrl && (
            <button
              className="mt-3 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card flip on button click
                playAudio();
              }}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Audio element (hidden) */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}
    </div>
  );
};

export default Flashcard;
