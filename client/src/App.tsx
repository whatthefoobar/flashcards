import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold text-center mb-4">Flashcard App</h1> */}
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
