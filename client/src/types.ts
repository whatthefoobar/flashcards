export interface Card {
  _id: string;
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
