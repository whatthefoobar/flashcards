import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../store";
import FlashcardCarousel from "../components/FlashcardCarousel";
import { fetchFlashcardSetById } from "../slices/flashcardSetsSlice";

const SetPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Grab the set with this id from the Redux array
  const { sets, status, error } = useSelector(
    (state: RootState) => state.flashcardSets
  );
  const selectedSet = sets.find((s) => s._id === id);
  console.log(selectedSet);
  useEffect(() => {
    // If not already in the store, fetch it
    if (id && !selectedSet) {
      dispatch(fetchFlashcardSetById(id));
    }
  }, [id, selectedSet, dispatch]);

  if (status === "loading" && !selectedSet) return <p>Loading…</p>;
  if (error && !selectedSet) return <p>{error}</p>;
  if (!selectedSet) return <p>No set found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{selectedSet.title}</h1>
      <FlashcardCarousel flashcards={selectedSet.cards} />
    </div>
  );
};

export default SetPage;
