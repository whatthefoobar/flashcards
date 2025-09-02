import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold text-center mb-4">Flashcard App</h1> */}
      <Outlet />
    </div>
  );
}

export default App;
