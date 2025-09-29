import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchFlashcardSets } from "../slices/flashcardSetsSlice";
import { Link } from "react-router-dom";
import axios from "axios";

interface CardInput {
  question: string;
  answer: string;
}

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.currentUser);
  const flashcardSets = useAppSelector((state) => state.flashcardSets.sets);
  console.log("My profile page flashcardSets", flashcardSets);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [cards, setCards] = useState<CardInput[]>([
    { question: "", answer: "" },
  ]);

  useEffect(() => {
    if (user) {
      dispatch(fetchFlashcardSets())
        .unwrap() // from redux-toolkit unwrap() allows catch(console.error) to actually catch errors from the thunk
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [dispatch, user]);

  // onclick of add new card adds an empty field card that is later replaces with setCards once each input runs their onchange
  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  const handleCardChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const handleAddSet = async () => {
    if (!newTitle.trim()) return;
    try {
      const newSet = {
        title: newTitle,
        user: user?._id,
        cards: cards.filter((c) => c.question.trim() && c.answer.trim()),
      };

      await axios.post("http://localhost:5500/api/flashcards/sets", newSet, {
        withCredentials: true,
      });

      dispatch(fetchFlashcardSets());
      setShowModal(false);
      setNewTitle("");
      setCards([{ question: "", answer: "" }]);
    } catch (err) {
      console.error("Failed to add new set", err);
    }
  };

  const closeModal = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setAnimateOut(false);
      setShowModal(false);
    }, 300); // match Tailwind transition duration
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

  if (loading) return <div>Loading your sets...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        Welcome {user.username}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Add set button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full h-32 bg-green-400 rounded-lg shadow-md flex items-center justify-center text-4xl font-bold text-white hover:bg-green-500 transition"
        >
          +
        </button>

        {/* Existing sets */}
        {flashcardSets.map((set) => (
          <Link
            key={set._id}
            to={`/sets/${set._id}`}
            className="w-full h-32 bg-blue-200 rounded-lg shadow-md flex items-center justify-center font-semibold text-lg hover:bg-blue-300 transition"
          >
            {set.title}
          </Link>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto"
          onClick={closeModal} // click outside to close
        >
          <div
            className={`bg-white p-6 rounded-lg w-full max-w-2xl transform transition-all duration-300
        ${
          animateOut
            ? "opacity-0 scale-95 -translate-y-4"
            : "opacity-100 scale-105 translate-y-0"
        }`}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h3 className="text-xl font-bold mb-4">Create New Set</h3>

            {/* Set title */}
            <input
              type="text"
              placeholder="Set Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Flashcards */}
            {cards.map((card, index) => (
              <div key={index} className="flex gap-2 mb-2">
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
                onClick={handleAddSet}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
