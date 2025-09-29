import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Card } from "../types";

interface FlashcardSet {
  _id: string;
  user: string;
  title: string;
  cards: Card[];
}

interface FlashcardSetsState {
  sets: FlashcardSet[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FlashcardSetsState = {
  sets: [],
  status: "idle",
  error: null,
};

// ✅ fetch all sets for the logged-in user
export const fetchFlashcardSets = createAsyncThunk(
  "flashcardSets/fetchFlashcardSets",
  async () => {
    const response = await axios.get(
      "http://localhost:5500/api/flashcards/sets",
      { withCredentials: true }
    );
    return response.data as FlashcardSet[];
  }
);

// ✅ fetch a single set by id
export const fetchFlashcardSetById = createAsyncThunk(
  "flashcardSets/fetchFlashcardSetById",
  async (id: string) => {
    const response = await axios.get(
      `http://localhost:5500/api/flashcards/sets/${id}`,
      { withCredentials: true }
    );
    return response.data as FlashcardSet;
  }
);

const flashcardSetsSlice = createSlice({
  name: "flashcardSets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- all sets ---
      .addCase(fetchFlashcardSets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchFlashcardSets.fulfilled,
        (state, action: PayloadAction<FlashcardSet[]>) => {
          state.status = "succeeded";
          state.sets = action.payload;
        }
      )
      .addCase(fetchFlashcardSets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch sets";
      })

      // --- single set ---
      .addCase(
        fetchFlashcardSetById.fulfilled,
        (state, action: PayloadAction<FlashcardSet>) => {
          // If the set is already in the array, update it; otherwise add it
          const index = state.sets.findIndex(
            (s) => s._id === action.payload._id
          );
          if (index >= 0) {
            state.sets[index] = action.payload;
          } else {
            state.sets.push(action.payload);
          }
        }
      )
      .addCase(fetchFlashcardSetById.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch set";
      });
  },
});

export default flashcardSetsSlice.reducer;
