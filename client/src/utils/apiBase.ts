// src/utils/apiBase.ts

// Use environment variable when available (for production)
const BASE_BACKEND_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5500/api";

export const FLASHCARDS_BASE_URL = `${BASE_BACKEND_URL}/flashcards`;
export const USERS_BASE_URL = `${BASE_BACKEND_URL}/auth`;
