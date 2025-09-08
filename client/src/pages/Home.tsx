import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import MyProfile from "./MyProfile";

const Home = () => {
  const user = useAppSelector((state) => state.users.currentUser);

  if (user) {
    // If logged in, show the MyProfile component
    return <MyProfile />;
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="space-x-4 mt-4">
        <Link to="/register">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            New here?
          </button>
        </Link>
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Sign in
          </button>
        </Link>
        <Link to="/demo">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Demo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
