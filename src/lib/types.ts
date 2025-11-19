// Utility functions for working with our database models

export interface FlashcardTag {
  name: string;
  category: 'medical' | 'procedure' | 'anatomy' | 'symptom' | 'equipment' | 'protocol' | 'assessment';
}

export interface StudySessionFilters {
  chapterNumbers: number[];
  categoryIds: number[];
  difficulties: string[];
  tags: string[];
}

// Parse JSON strings back to arrays for SQLite compatibility
export function parseJsonField<T>(field: string): T[] {
  try {
    return JSON.parse(field) as T[];
  } catch {
    return [];
  }
}

// Convert arrays to JSON strings for SQLite storage
export function stringifyArrayField<T>(array: T[]): string {
  return JSON.stringify(array);
}

// Parse flashcard tags from JSON string
export function parseFlashcardTags(tagsJson: string): FlashcardTag[] {
  try {
    const tags = JSON.parse(tagsJson);
    if (Array.isArray(tags)) {
      return tags.map(tag => 
        typeof tag === 'string' 
          ? { name: tag, category: 'medical' } 
          : tag
      );
    }
    return [];
  } catch {
    return [];
  }
}

// Study session mode types
export type StudyMode = 'quick_drill' | 'deep_session' | 'exam_mimic' | 'spaced_repetition' | 'scenario_chain';

export interface StudyModeConfig {
  mode: StudyMode;
  name: string;
  description: string;
  timeLimit?: number; // minutes
  cardLimit?: number;
  showAnswersImmediately: boolean;
  allowRetries: boolean;
  shuffleCards: boolean;
  includeScenarios: boolean;
}

export const STUDY_MODES: Record<StudyMode, StudyModeConfig> = {
  quick_drill: {
    mode: 'quick_drill',
    name: 'Quick Drill',
    description: 'Fast-paced review of 10-20 cards with immediate feedback',
    timeLimit: 10,
    cardLimit: 20,
    showAnswersImmediately: true,
    allowRetries: false,
    shuffleCards: true,
    includeScenarios: false
  },
  deep_session: {
    mode: 'deep_session',
    name: 'Deep Session',
    description: 'Comprehensive study session with detailed explanations',
    cardLimit: 50,
    showAnswersImmediately: false,
    allowRetries: true,
    shuffleCards: true,
    includeScenarios: true
  },
  exam_mimic: {
    mode: 'exam_mimic',
    name: 'Exam Mimic',
    description: 'Practice test conditions with timed questions',
    timeLimit: 90,
    cardLimit: 100,
    showAnswersImmediately: false,
    allowRetries: false,
    shuffleCards: true,
    includeScenarios: true
  },
  spaced_repetition: {
    mode: 'spaced_repetition',
    name: 'Spaced Repetition',
    description: 'AI-powered review based on your learning progress',
    showAnswersImmediately: true,
    allowRetries: true,
    shuffleCards: false,
    includeScenarios: true
  },
  scenario_chain: {
    mode: 'scenario_chain',
    name: 'Scenario Chain',
    description: 'Sequential clinical scenarios building on each other',
    cardLimit: 15,
    showAnswersImmediately: false,
    allowRetries: false,
    shuffleCards: false,
    includeScenarios: true
  }
};

// Difficulty levels for EMT-B
export const DIFFICULTY_LEVELS = {
  BASIC: 'Basic',
  INTERMEDIATE: 'Intermediate', 
  ADVANCED: 'Advanced'
} as const;

// Certification levels
export const CERT_LEVELS = {
  EMR: 'EMR',
  EMT: 'EMT',
  AEMT: 'AEMT',
  PARAMEDIC: 'Paramedic'
} as const;

// Card types for different learning approaches
export const CARD_TYPES = {
  DEFINITION: 'definition',
  RECOGNITION: 'recognition',
  APPLICATION: 'application',
  SCENARIO: 'scenario',
  ASSESSMENT: 'assessment'
} as const;