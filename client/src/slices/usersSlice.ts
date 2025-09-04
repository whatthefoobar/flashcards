import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
}

interface UsersState {
  users: User[];
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  status: "idle",
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:5500/api/users", {
    withCredentials: true,
  });
  return response.data; // array of users
});

// Login user
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (credentials: { username: string; password: string }) => {
    const response = await axios.post(
      "http://localhost:5500/api/auth/login",
      credentials,
      { withCredentials: true }
    );
    return response.data; // logged-in user
  }
);

// Register user
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user: { username: string; email: string; password: string }) => {
    const response = await axios.post(
      "http://localhost:5500/api/auth/register",
      user,
      { withCredentials: true }
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      });
  },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
