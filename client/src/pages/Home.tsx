import { Link } from "react-router-dom";
// import LoginForm from "../components/LoginForm";

const Home = () => {
  return (
    <div>
      {/* <LoginForm /> */}
      <div className="space-x-4 mt-4">
        <Link to="/register">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            New here?
          </button>
        </Link>
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Sign in
          </button>
        </Link>
        <Link to="/demo">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Demo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
