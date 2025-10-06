// card inside a set
export interface Card {
  _id?: string;
  question: string;
  answer: string;
  audioUrl?: string;
}

export interface FlashcardSet {
  _id: string;
  user: string;
  title: string;
  cards: Card[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
}

// interface FlashcardSet {
//   _id: string;
//   user: string;
//   title: string;
//   cards: Card[];
// }

export interface FlashcardSetsState {
  sets: FlashcardSet[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface FlashcardSetPayload {
  title: string;
  user: string;
  cards: Card[];
}
