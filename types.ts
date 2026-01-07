export interface PhaseData {
  id: number;
  title: string;
  duration: string;
  emotionalObjectives: string[];
  practicalObjectives: string[];
  indicatedTraining: string[];
  advancementCriteria?: string[];
  description?: string; // Optional for Phase 8 extra text
}

export interface SectionData {
  title: string;
  content: string[]; // Can be paragraphs or bullet points
  isList?: boolean;
}