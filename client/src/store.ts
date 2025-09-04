import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import flashcardSetsReducer from "./slices/flashcardSetsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    flashcardSets: flashcardSetsReducer,
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
