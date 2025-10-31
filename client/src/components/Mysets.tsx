// not used atm
import { Link } from "react-router-dom";
import { FlashcardSet } from "../types";

interface MySetsProps {
  sets: FlashcardSet[];
}

// gallery of my flashcard sets
const MySets = ({ sets }: MySetsProps) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Sets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sets.map((set) => (
          <Link
            key={set._id}
            to={`/sets/${set._id}`}
            className="w-full h-32 bg-blue-200 rounded-lg shadow-md flex items-center justify-center font-semibold text-lg hover:bg-blue-300 transition"
          >
            {set.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MySets;
