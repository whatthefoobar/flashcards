import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Card,
  FlashcardSet,
  FlashcardSetPayload,
  FlashcardSetsState,
} from "../types";
import { FLASHCARDS_BASE_URL } from "../utils/apiBase";

const initialState: FlashcardSetsState = {
  sets: [],
  status: "idle",
  error: null,
};

// --- fetch all sets ---
export const fetchFlashcardSets = createAsyncThunk(
  "flashcardSets/fetchFlashcardSets",
  async () => {
    const response = await axios.get(`${FLASHCARDS_BASE_URL}/sets`, {
      withCredentials: true,
    });
    return response.data as FlashcardSet[];
  }
);

// --- fetch one set ---
export const fetchFlashcardSetById = createAsyncThunk(
  "flashcardSets/fetchFlashcardSetById",
  async (id: string) => {
    const response = await axios.get(`${FLASHCARDS_BASE_URL}/sets/${id}`, {
      withCredentials: true,
    });
    return response.data as FlashcardSet;
  }
);

// --- create a new set ---
export const createFlashcardSet = createAsyncThunk(
  "flashcardSets/createFlashcardSet",
  async (payload: { title: string; user: string; cards: Card[] }) => {
    const response = await axios.post(`${FLASHCARDS_BASE_URL}/sets`, payload, {
      withCredentials: true,
    });
    return response.data as FlashcardSet;
  }
);

// --- update an existing set ---
export const updateFlashcardSet = createAsyncThunk(
  "flashcardSets/updateFlashcardSet",

  async ({ id, payload }: { id: string; payload: FlashcardSetPayload }) => {
    const response = await axios.put(
      `${FLASHCARDS_BASE_URL}/sets/${id}`,
      payload,
      {
        withCredentials: true,
      }
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
      })

      // --- create ---
      .addCase(
        createFlashcardSet.fulfilled,
        (state, action: PayloadAction<FlashcardSet>) => {
          state.sets.push(action.payload);
        }
      )

      // --- update ---
      .addCase(
        updateFlashcardSet.fulfilled,
        (state, action: PayloadAction<FlashcardSet>) => {
          const index = state.sets.findIndex(
            (s) => s._id === action.payload._id
          );
          if (index >= 0) {
            state.sets[index] = action.payload;
          }
        }
      );
  },
});

export default flashcardSetsSlice.reducer;
