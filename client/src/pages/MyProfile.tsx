import MySets from "../components/Mysets";
import Navbar from "../components/Navbar";

// this will be imported from the db
// get all usernames sets and list them
const sampleSets = [
  { id: "1", name: "Learn basic Swedish" },
  { id: "2", name: "Learn basic Romanian" },
  { id: "3", name: "Learn basic Spanish" },
  { id: "4", name: "Geography" },
  { id: "5", name: "Physics" },
  { id: "6", name: "Chemistry" },
  { id: "7", name: "Literature" },
  { id: "8", name: "Art" },
];

const MyProfile = () => {
  return (
    <div>
      <Navbar />
      <h2>Welcome Username</h2>
      <MySets sets={sampleSets} />
    </div>
  );
};

export default MyProfile;
