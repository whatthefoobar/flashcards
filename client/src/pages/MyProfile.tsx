import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  fetchFlashcardSets,
  createFlashcardSet,
  updateFlashcardSet,
} from "../slices/flashcardSetsSlice";
import { Link } from "react-router-dom";
import { Card, FlashcardSet } from "../types";

interface CardInput {
  question: string;
  answer: string;
}

interface EditingSet {
  _id: string;
  title: string;
  cards: CardInput[];
}

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.currentUser);
  const flashcardSets = useAppSelector((state) => state.flashcardSets.sets);
  const status = useAppSelector((state) => state.flashcardSets.status);

  const [showModal, setShowModal] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  // form state
  const [newTitle, setNewTitle] = useState("");
  const [cards, setCards] = useState<CardInput[]>([
    { question: "", answer: "" },
  ]);

  // track whether we're editing an existing set
  const [editingSet, setEditingSet] = useState<EditingSet | null>(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchFlashcardSets()).catch(console.error);
    }
  }, [dispatch, user]);

  // card is a q and a set inside a flashcard set
  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };
  // after handleEditSet (click edit card btn)
  // Lets you type into an input and update just that card’s question or answer.
  // Copies the cards array (newCards).
  // Updates the correct card (index) and field (question or answer).
  // Saves it back with setCards.
  // Purpose: handle edits inside the form while user is typing.
  const handleCardChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const handleDeleteCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };
  // Takes the set the user clicked "edit" on.
  // Stores it in editingSet → keeps track of which set is being edited.
  // Copies the set’s title into newTitle (so the form input is pre-filled).
  // Copies the set’s cards into local state cards (so the inputs show the existing Q/As).
  // Opens the modal.
  const handleEditSet = (set: FlashcardSet) => {
    setEditingSet({
      _id: set._id,
      title: set.title,
      cards: set.cards.map((c: Card) => ({
        question: c.question,
        answer: c.answer,
      })),
    });
    setNewTitle(set.title);
    setCards(
      set.cards.map((c: Card) => ({ question: c.question, answer: c.answer }))
    );
    setShowModal(true);
  };

  const handleSaveSet = async () => {
    if (!user || !user._id) return;
    if (!newTitle.trim()) return;

    const payload = {
      title: newTitle,
      user: user._id,
      cards: cards.filter((c) => c.question.trim() && c.answer.trim()),
    };

    // Trigger closing animation
    setAnimateOut(true);

    // Wait for the animation to finish (match Tailwind duration, e.g., 300ms)
    setTimeout(async () => {
      try {
        if (editingSet) {
          await dispatch(
            updateFlashcardSet({ id: editingSet._id, payload })
          ).unwrap();
        } else {
          await dispatch(createFlashcardSet(payload)).unwrap();
        }

        await dispatch(fetchFlashcardSets()).unwrap();

        // Reset modal state
        setAnimateOut(false);
        setShowModal(false);
        setEditingSet(null);
        setNewTitle("");
        setCards([{ question: "", answer: "" }]);
      } catch (err) {
        console.error("Failed to save set", err);
      }
    }, 300); // match your Tailwind transition
  };

  const closeModal = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setAnimateOut(false);
      setShowModal(false);
      setEditingSet(null);
      setNewTitle("");
      setCards([{ question: "", answer: "" }]);
    }, 300);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p>Please log in</p>
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Login
          </button>
        </Link>
      </div>
    );
  }

  if (status === "loading") return <div>Loading your sets...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        Welcome {user.username}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="w-full h-32 bg-green-400 rounded-lg shadow-md flex items-center justify-center text-4xl font-bold text-white hover:bg-green-500 transition"
        >
          +
        </button>

        {flashcardSets.map((set) => (
          <div key={set._id} className="relative">
            <Link
              to={`/sets/${set._id}`}
              className="block w-full h-32 bg-blue-200 rounded-lg shadow-md flex items-center justify-center font-semibold text-lg hover:bg-blue-300 transition"
            >
              {set.title}
            </Link>
            <button
              onClick={() => handleEditSet(set)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
              aria-label="Edit set"
            >
              ✏️
            </button>
          </div>
        ))}
      </div>

      {/* Modal (unchanged) */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto"
          onClick={closeModal}
        >
          <div
            className={`bg-white p-6 rounded-lg w-full max-w-2xl transform transition-all duration-300 ${
              animateOut
                ? "opacity-0 scale-95 -translate-y-4"
                : "opacity-100 scale-105 translate-y-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">
              {editingSet ? "Edit Set" : "Create New Set"}
            </h3>

            <input
              type="text"
              placeholder="Set Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {cards.map((card, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  placeholder="Question"
                  value={card.question}
                  onChange={(e) =>
                    handleCardChange(index, "question", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Answer"
                  value={card.answer}
                  onChange={(e) =>
                    handleCardChange(index, "answer", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleDeleteCard(index)}
                  className="px-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  aria-label="Delete card"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              onClick={handleAddCard}
              className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              + Add Another Card
            </button>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSet}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editingSet ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
