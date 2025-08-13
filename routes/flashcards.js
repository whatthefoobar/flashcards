import { Router } from "express";
import FlashcardSet from "../models/FlashcardSet.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

// Create a new learning set
router.post("/sets", auth, async (req, res) => {
  const { title, cards } = req.body;

  try {
    const newSet = new FlashcardSet({
      user: req.user.id,
      title,
      cards,
    });

    const set = await newSet.save();
    res.json(set);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add a new question and answer to the set
router.put("/sets/:id", auth, async (req, res) => {
  const { question, answer } = req.body;

  try {
    let set = await FlashcardSet.findById(req.params.id);
    if (!set) {
      return res.status(404).json({ msg: "Set not found" });
    }

    set.cards.push({ question, answer });

    await set.save();
    res.json(set);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a question and answer from the set
router.delete("/sets/:setId/cards/:cardId", auth, async (req, res) => {
  try {
    let set = await FlashcardSet.findById(req.params.setId);
    if (!set) {
      return res.status(404).json({ msg: "Set not found" });
    }

    set.cards = set.cards.filter((card) => card.id !== req.params.cardId);

    await set.save();
    res.json(set);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a set
router.delete("/sets/:id", auth, async (req, res) => {
  try {
    const set = await FlashcardSet.findById(req.params.id);
    if (!set) {
      return res.status(404).json({ msg: "Set not found" });
    }

    await set.remove();
    res.json({ msg: "Set removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all sets
router.get("/sets", auth, async (req, res) => {
  try {
    const sets = await FlashcardSet.find({ user: req.user.id });
    res.json(sets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
