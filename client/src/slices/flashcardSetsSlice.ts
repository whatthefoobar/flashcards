import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Card {
  question: string;
  answer: string;
}

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

// Thunk to fetch sets from backend assoc to a logged in user
export const fetchFlashcardSets = createAsyncThunk(
  "flashcardSets/fetchFlashcardSets",
  async () => {
    const response = await axios.get(
      "http://localhost:5500/api/flashcards/sets",
      { withCredentials: true } // important for auth middleware
    );
    console.log(response.data);

    return response.data; // array of sets
  }
);

const flashcardSetsSlice = createSlice({
  name: "flashcardSets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default flashcardSetsSlice.reducer;
