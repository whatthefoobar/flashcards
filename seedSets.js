import dotenv from "dotenv";
import connectDB from "./config/connectToDB.js";
import FlashcardSet from "./models/FlashcardSet.js";
import sets from "./data/flashcardsets.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await FlashcardSet.deleteMany();
    await FlashcardSet.insertMany(sets);

    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await FlashcardSet.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
