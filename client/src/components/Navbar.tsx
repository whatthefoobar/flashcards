import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // simple icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5500/api/auth/logout", {
        method: "POST", // usually logout is POST
        credentials: "include", // important if using cookies
      });
      localStorage.removeItem("token"); // optional if using JWT
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-xl font-bold cursor-pointer">FlashcardsApp</div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <span>👤 Username</span>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-3">
          <div className="text-white">👤 Username</div>
          <button
            onClick={handleLogout}
            className="w-full bg-white text-blue-600 px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
