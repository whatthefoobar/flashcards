import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createFlashcardSet,
  getFlashcardSets,
  getFlashcardSetById,
  updateFlashcardSet,
  deleteFlashcardSet,
  deleteFlashcard,
} from "../controllers/flashcardController.js";

const router = Router();

// POST /api/flashcards/sets → Create a set
router.post("/sets", auth, createFlashcardSet);

// GET /api/flashcards/sets → Get all user sets
router.get("/sets", auth, getFlashcardSets);

// GET /api/flashcards/sets/:id → Get one set
router.get("/sets/:id", getFlashcardSetById);

// PUT /api/flashcards/sets/:id → Update set
router.put("/sets/:id", auth, updateFlashcardSet);

// DELETE /api/flashcards/sets/:id → Delete set
router.delete("/sets/:id", auth, deleteFlashcardSet);

// DELETE /api/flashcards/sets/:setId/cards/:cardId → Delete one card
router.delete("/sets/:setId/cards/:cardId", auth, deleteFlashcard);

export default router;

// import { Router } from "express";
// import FlashcardSet from "../models/FlashcardSet.js";
// import auth from "../middleware/authMiddleware.js";

// const router = Router();

// // Create a new learning set
// router.post("/sets", auth, async (req, res) => {
//   const { title, cards } = req.body;

//   try {
//     const newSet = new FlashcardSet({
//       user: req.user.id,
//       title,
//       cards,
//     });

//     const set = await newSet.save();
//     res.json(set);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// // GET /api/sets/:id
// router.get("/sets/:id", async (req, res) => {
//   const set = await FlashcardSet.findById(req.params.id);
//   res.json(set); // set.flashcards should be an array of { front, back, audioUrl }
// });

// // Add a new question and answer to the set
// router.put("/sets/:id", async (req, res) => {
//   const { title, cards } = req.body;
//   await FlashcardSet.findByIdAndUpdate(req.params.id, { title, cards });
//   res.json({ success: true });
// });
// // router.put("/sets/:id", auth, async (req, res) => {
// //   const { question, answer } = req.body;

// //   try {
// //     let set = await FlashcardSet.findById(req.params.id);
// //     if (!set) {
// //       return res.status(404).json({ msg: "Set not found" });
// //     }

// //     set.cards.push({ question, answer });

// //     await set.save();
// //     res.json(set);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server error");
// //   }
// // });

// // Delete a question and answer from the set
// router.delete("/sets/:setId/cards/:cardId", auth, async (req, res) => {
//   try {
//     let set = await FlashcardSet.findById(req.params.setId);
//     if (!set) {
//       return res.status(404).json({ msg: "Set not found" });
//     }

//     set.cards = set.cards.filter((card) => card.id !== req.params.cardId);

//     await set.save();
//     res.json(set);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// // Delete a set
// router.delete("/sets/:id", auth, async (req, res) => {
//   try {
//     const set = await FlashcardSet.findById(req.params.id);
//     if (!set) {
//       return res.status(404).json({ msg: "Set not found" });
//     }

//     await set.remove();
//     res.json({ msg: "Set removed" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// // Get all sets
// router.get("/sets", auth, async (req, res) => {
//   try {
//     const sets = await FlashcardSet.find({ user: req.user.id });
//     res.json(sets);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// export default router;
