import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchFlashcardSets } from "../slices/flashcardSetsSlice";
import MySets from "../components/Mysets";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.currentUser);
  const flashcardSets = useAppSelector((state) => state.flashcardSets.sets);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log("the loaded sets:", flashcardSets);
  }, [flashcardSets]);

  useEffect(() => {
    const loadSets = async () => {
      try {
        await dispatch(fetchFlashcardSets()).unwrap();
      } catch (err) {
        console.error("Failed to load sets", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadSets();
    }
  }, [dispatch, user]);

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
    <div>
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Welcome {user.username}</h2>
      <MySets
        sets={flashcardSets.map((set) => ({ id: set._id, name: set.title }))}
      />
    </div>
  );
};
export default MyProfile;
