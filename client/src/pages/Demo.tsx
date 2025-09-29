import FlashcardCarousel from "../components/FlashcardCarousel";
const flashcardsData = [
  {
    question: "Apple",
    answer: "Manzana",
    audioUrl: "/assets/audio/sample.mp3",
  },
  {
    question: "Book",
    answer: "Libro",
  },
  {
    question: "House",
    answer: "Casa",
  },
];
const DemoFlashcard = () => {
  return <FlashcardCarousel flashcards={flashcardsData} />;
};

export default DemoFlashcard;
