import { z } from "zod";

// Game phrase type
export const phraseSchema = z.object({
  id: z.string(),
  text: z.string(),
  encrypted: z.string(),
  shift: z.number().min(1).max(25),
});

export type Phrase = z.infer<typeof phraseSchema>;

// Game state type
export const gameStateSchema = z.object({
  currentPhrase: phraseSchema.nullable(),
  remainingPhrases: z.array(z.string()),
  solvedCount: z.number().min(0),
  totalPhrases: z.number(),
  startTime: z.number().nullable(),
  isGameActive: z.boolean(),
  lastAnswerCorrect: z.boolean().nullable(),
});

export type GameState = z.infer<typeof gameStateSchema>;

// User input validation
export const answerSchema = z.object({
  answer: z.string().min(1, "Please enter your decryption"),
});

export type Answer = z.infer<typeof answerSchema>;

// Stats type
export type GameStats = {
  solvedCount: number;
  totalPhrases: number;
  timeTaken: number | null;
  accuracy: number;
};
