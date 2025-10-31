import asyncHandler from "../middleware/asyncHandler.js";
import FlashcardSet from "../models/FlashcardSet.js";

/**
 * @desc    Create a new flashcard set
 * @route   POST /api/flashcards/sets
 * @access  Private
 */
export const createFlashcardSet = asyncHandler(async (req, res) => {
  const { title, cards } = req.body;

  const newSet = new FlashcardSet({
    user: req.user.id,
    title,
    cards,
  });

  const set = await newSet.save();
  res.status(201).json(set);
});

/**
 * @desc    Get all flashcard sets for logged-in user
 * @route   GET /api/flashcards/sets
 * @access  Private
 */
export const getFlashcardSets = asyncHandler(async (req, res) => {
  const sets = await FlashcardSet.find({ user: req.user.id });
  res.json(sets);
});

/**
 * @desc    Get a single flashcard set by ID
 * @route   GET /api/flashcards/sets/:id
 * @access  Public or Private (depending on your design)
 */
export const getFlashcardSetById = asyncHandler(async (req, res) => {
  const set = await FlashcardSet.findById(req.params.id);
  if (!set) {
    res.status(404);
    throw new Error("Set not found");
  }
  res.json(set);
});

/**
 * @desc    Update a flashcard set (title or cards)
 * @route   PUT /api/flashcards/sets/:id
 * @access  Private
 */
export const updateFlashcardSet = asyncHandler(async (req, res) => {
  const { title, cards } = req.body;

  const set = await FlashcardSet.findById(req.params.id);
  if (!set) {
    res.status(404);
    throw new Error("Set not found");
  }

  if (set.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  set.title = title || set.title;
  set.cards = cards || set.cards;

  const updatedSet = await set.save();
  res.json(updatedSet);
});

/**
 * @desc    Delete a flashcard set
 * @route   DELETE /api/flashcards/sets/:id
 * @access  Private
 */
export const deleteFlashcardSet = asyncHandler(async (req, res) => {
  const set = await FlashcardSet.findById(req.params.id);
  if (!set) {
    res.status(404);
    throw new Error("Set not found");
  }

  if (set.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await set.deleteOne();
  res.json({ message: "Set removed" });
});

/**
 * @desc    Delete a single card from a set
 * @route   DELETE /api/flashcards/sets/:setId/cards/:cardId
 * @access  Private
 */
export const deleteFlashcard = asyncHandler(async (req, res) => {
  const { setId, cardId } = req.params;

  const set = await FlashcardSet.findById(setId);
  if (!set) {
    res.status(404);
    throw new Error("Set not found");
  }

  if (set.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  set.cards = set.cards.filter((card) => card.id !== cardId);
  const updatedSet = await set.save();
  res.json(updatedSet);
});
