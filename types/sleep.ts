export type SoundCategory = 'all' | 'rain' | 'nature' | 'urban' | 'ambient' | 'meditation';

export interface AmbientSound {
  id: string;
  name: string;
  category: SoundCategory;
  iconName: string;
  audioUrl: string;
  volume: number; // 0.0 to 1.0
  isPlaying: boolean;
  color: string;
}

export type SleepTimerOption = 15 | 30 | 45 | 60 | 90 | 120 | null;

export type MorningMood = 'energized' | 'rested' | 'tired' | 'exhausted';

export type SleepFactor = 'caffeine' | 'late_meal' | 'exercise' | 'stress' | 'screen_time' | 'alcohol';

export interface SleepSession {
  id: string;
  bedtime: string;       // ISO string
  wakeTime: string;      // ISO string
  durationMinutes: number;
  efficiencyScore: number; // 0-100%
  mood?: MorningMood;
  factors: SleepFactor[];
  notes?: string;
}

export interface SleepPreset {
  id: string;
  name: string;
  sounds: { id: string; volume: number }[];
}

export interface SleepStats {
  averageDurationMinutes: number;
  averageScore: number;
  totalSessions: number;
  bestMood: MorningMood | 'None';
}
