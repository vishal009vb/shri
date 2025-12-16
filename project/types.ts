export interface StudyNote {
  topic: string;
  content: string;
  timestamp: number;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  data: StudyNote | null;
}

export enum NoteTone {
  SIMPLE = 'Simple & Easy',
  DETAILED = 'Detailed & Technical',
  ANALOGY = 'Analogy Based'
}