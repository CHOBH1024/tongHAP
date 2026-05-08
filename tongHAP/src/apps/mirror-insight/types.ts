export interface SurveyQuestion {
  c: number; // Category index (1-6)
  t: 'L' | 'R' | 'V'; // Question type
  q: string; // Question text
  left?: string; // Dilemma left
  right?: string; // Dilemma right
  descL?: string; // Dilemma desc left
  descR?: string; // Dilemma desc right
  opts?: string[]; // Multi-choice options for V type (3-5 items, score mapped 5→1)
}

export interface SurveyResultContent {
  persona: string;
  headline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
}

export interface SurveyConfig {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  categories: string[];
  questions: SurveyQuestion[];
  getResultContent: (averageScore: number, categoryScores: number[]) => SurveyResultContent;
}
