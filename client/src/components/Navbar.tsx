import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "../hooks";
import { useDispatch } from "react-redux";
import { logout } from "../slices/usersSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5500/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear Redux state
      dispatch(logout());

      // Optional: clear token from localStorage if using JWT
      localStorage.removeItem("token");

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-white no-underline text-xl font-bold cursor-pointer hover:text-gray-200"
          >
            FlashcardsApp
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/myprofile" className="capitalize hover:underline">
                👤 {user.username}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Log in
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-3">
          {user ? (
            <>
              <Link to="/myprofile" className="text-white capitalize block ">
                👤 {user.username}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-white text-blue-600 px-3 py-2 rounded hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="w-full block text-center bg-white text-blue-600 px-3 py-2 rounded hover:bg-gray-200 transition"
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
