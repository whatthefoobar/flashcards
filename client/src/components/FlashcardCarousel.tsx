import { useState } from "react";
import Flashcard from "./Flashcard"; // Import your Flashcard component

const flashcardsData = [
  {
    front: "Apple",
    back: "Manzana",
    audioUrl: "/assets/audio/sample.mp3",
  },
  {
    front: "Book",
    back: "Libro",
  },
  {
    front: "House",
    back: "Casa",
  },
];

const FlashcardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next card
  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
  };

  // Function to go to the previous card
  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Flashcard
        front={flashcardsData[currentIndex].front}
        back={flashcardsData[currentIndex].back}
        audioUrl={flashcardsData[currentIndex].audioUrl}
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={prevCard}
          className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardCarousel;
