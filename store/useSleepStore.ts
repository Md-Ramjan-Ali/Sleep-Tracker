import { create } from 'zustand';
import {
  AmbientSound,
  MorningMood,
  SleepFactor,
  SleepPreset,
  SleepSession,
  SleepStats,
  SleepTimerOption,
  SoundCategory,
} from '../types/sleep';
import { audioEngine, INITIAL_AMBIENT_SOUNDS } from '../services/audioService';
import {
  loadSleepPresets,
  loadSleepSessions,
  saveSleepPresets,
  saveSleepSessions,
} from '../services/sleepStorage';

interface SleepState {
  sounds: AmbientSound[];
  activeCategory: SoundCategory;
  timerMinutes: SleepTimerOption;
  timerRemainingSeconds: number | null;
  timerIntervalId: any | null;

  // Night Mode Session
  isNightModeActive: boolean;
  activeBedtimeISO: string | null;

  // History & Presets
  sessions: SleepSession[];
  presets: SleepPreset[];
  activeTab: 'sounds' | 'tracker' | 'analytics';

  // Initialization & Actions
  init: () => Promise<void>;
  setActiveTab: (tab: 'sounds' | 'tracker' | 'analytics') => void;
  setActiveCategory: (category: SoundCategory) => void;
  toggleSound: (id: string) => Promise<void>;
  setSoundVolume: (id: string, volume: number) => Promise<void>;
  stopAllSounds: () => Promise<void>;
  setSleepTimer: (minutes: SleepTimerOption) => void;
  clearSleepTimer: () => void;
  startNightSession: () => void;
  endNightSession: (mood?: MorningMood, factors?: SleepFactor[]) => Promise<void>;
  addSession: (session: SleepSession) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
  getStats: () => SleepStats;
}

export const useSleepStore = create<SleepState>((set, get) => ({
  sounds: INITIAL_AMBIENT_SOUNDS,
  activeCategory: 'all',
  timerMinutes: null,
  timerRemainingSeconds: null,
  timerIntervalId: null,

  isNightModeActive: false,
  activeBedtimeISO: null,

  sessions: [],
  presets: [],
  activeTab: 'sounds',

  init: async () => {
    // Ensure all audio engine tracks are stopped on app launch
    await audioEngine.stopAllTracks();

    const loadedSessions = await loadSleepSessions();
    const loadedPresets = await loadSleepPresets();

    let sampleSessions = loadedSessions;
    if (sampleSessions.length === 0) {
      const now = new Date();
      const yesterdayBed = new Date(now.getTime() - 8 * 3600 * 1000);
      sampleSessions = [
        {
          id: 'sample_1',
          bedtime: yesterdayBed.toISOString(),
          wakeTime: now.toISOString(),
          durationMinutes: 480,
          efficiencyScore: 88,
          mood: 'rested',
          factors: ['caffeine', 'exercise'],
        },
      ];
      await saveSleepSessions(sampleSessions);
    }

    set({
      sounds: INITIAL_AMBIENT_SOUNDS.map((s) => ({ ...s, isPlaying: false })),
      sessions: sampleSessions,
      presets: loadedPresets,
    });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setActiveCategory: (category) => set({ activeCategory: category }),

  toggleSound: async (id) => {
    const { sounds } = get();
    const sound = sounds.find((s) => s.id === id);
    if (!sound) return;

    const willPlay = !sound.isPlaying;

    set({
      sounds: sounds.map((s) =>
        s.id === id ? { ...s, isPlaying: willPlay } : s
      ),
    });

    if (willPlay) {
      await audioEngine.playTrack(sound.id, sound.audioUrl, sound.volume);
    } else {
      await audioEngine.stopTrack(sound.id);
    }
  },

  setSoundVolume: async (id, volume) => {
    set((state) => ({
      sounds: state.sounds.map((s) => (s.id === id ? { ...s, volume } : s)),
    }));

    const sound = get().sounds.find((s) => s.id === id);
    if (sound && sound.isPlaying) {
      await audioEngine.setTrackVolume(id, volume);
    }
  },

  stopAllSounds: async () => {
    await audioEngine.stopAllTracks();
    set((state) => ({
      sounds: state.sounds.map((s) => ({ ...s, isPlaying: false })),
    }));
  },

  setSleepTimer: (minutes) => {
    const { timerIntervalId, stopAllSounds } = get();
    if (timerIntervalId) clearInterval(timerIntervalId);

    if (!minutes) {
      set({ timerMinutes: null, timerRemainingSeconds: null, timerIntervalId: null });
      return;
    }

    const totalSeconds = minutes * 60;
    set({
      timerMinutes: minutes,
      timerRemainingSeconds: totalSeconds,
    });

    const interval = setInterval(() => {
      const { timerRemainingSeconds } = get();
      if (!timerRemainingSeconds || timerRemainingSeconds <= 1) {
        clearInterval(interval);
        set({ timerMinutes: null, timerRemainingSeconds: null, timerIntervalId: null });
        stopAllSounds();
      } else {
        set({ timerRemainingSeconds: timerRemainingSeconds - 1 });
      }
    }, 1000);

    set({ timerIntervalId: interval });
  },

  clearSleepTimer: () => {
    const { timerIntervalId } = get();
    if (timerIntervalId) clearInterval(timerIntervalId);
    set({ timerMinutes: null, timerRemainingSeconds: null, timerIntervalId: null });
  },

  startNightSession: () => {
    set({
      isNightModeActive: true,
      activeBedtimeISO: new Date().toISOString(),
    });
  },

  endNightSession: async (mood, factors = []) => {
    const { activeBedtimeISO, sessions } = get();
    const nowISO = new Date().toISOString();

    let durationMinutes = 480;
    let score = 85;

    if (activeBedtimeISO) {
      const bed = new Date(activeBedtimeISO).getTime();
      const wake = new Date(nowISO).getTime();
      const diffMs = Math.max(0, wake - bed);
      durationMinutes = Math.round(diffMs / (1000 * 60));

      const hours = durationMinutes / 60;
      if (hours >= 7 && hours <= 9) {
        score = Math.min(98, Math.round(85 + (hours - 7) * 5));
      } else if (hours < 7) {
        score = Math.max(40, Math.round((hours / 7) * 80));
      } else {
        score = Math.max(60, Math.round(90 - (hours - 9) * 5));
      }
    }

    const newSession: SleepSession = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      bedtime: activeBedtimeISO || new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
      wakeTime: nowISO,
      durationMinutes,
      efficiencyScore: score,
      mood: mood || 'rested',
      factors,
    };

    const updated = [newSession, ...sessions];
    await saveSleepSessions(updated);

    set({
      isNightModeActive: false,
      activeBedtimeISO: null,
      sessions: updated,
    });
  },

  addSession: async (session) => {
    const updated = [session, ...get().sessions];
    await saveSleepSessions(updated);
    set({ sessions: updated });
  },

  deleteSession: async (id) => {
    const updated = get().sessions.filter((s) => s.id !== id);
    await saveSleepSessions(updated);
    set({ sessions: updated });
  },

  getStats: () => {
    const { sessions } = get();
    if (sessions.length === 0) {
      return {
        averageDurationMinutes: 0,
        averageScore: 0,
        totalSessions: 0,
        bestMood: 'None',
      };
    }

    let totalMinutes = 0;
    let totalScore = 0;

    sessions.forEach((s) => {
      totalMinutes += s.durationMinutes;
      totalScore += s.efficiencyScore;
    });

    return {
      averageDurationMinutes: Math.round(totalMinutes / sessions.length),
      averageScore: Math.round(totalScore / sessions.length),
      totalSessions: sessions.length,
      bestMood: sessions[0]?.mood || 'rested',
    };
  },
}));
