import { useState } from "react";
import Flashcard from "./Flashcard";
import { Card } from "../types";

interface FlashcardCarouselProps {
  flashcards: Card[];
}

const FlashcardCarousel = ({ flashcards }: FlashcardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!flashcards || flashcards.length === 0) {
    return <p>No flashcards available.</p>;
  }

  const nextCard = () =>
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);

  const prevCard = () =>
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));

  const card = flashcards[currentIndex];
  return (
    <div className="flex flex-col items-center p-4">
      <Flashcard
        front={card.question}
        back={card.answer}
        audioUrl={card.audioUrl}
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={prevCard}
          className="px-6 py-2  bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          className="px-6 py-2  bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardCarousel;
