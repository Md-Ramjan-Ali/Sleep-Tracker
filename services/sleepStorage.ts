import AsyncStorage from '@react-native-async-storage/async-storage';
import { SleepPreset, SleepSession } from '../types/sleep';

const SESSIONS_STORAGE_KEY = '@plaxora_sleep_sessions';
const PRESETS_STORAGE_KEY = '@plaxora_sleep_presets';

export async function saveSleepSessions(sessions: SleepSession[]): Promise<void> {
  try {
    const json = JSON.stringify(sessions);
    await AsyncStorage.setItem(SESSIONS_STORAGE_KEY, json);
  } catch (error) {
    console.error('Error saving sleep sessions:', error);
  }
}

export async function loadSleepSessions(): Promise<SleepSession[]> {
  try {
    const json = await AsyncStorage.getItem(SESSIONS_STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error loading sleep sessions:', error);
    return [];
  }
}

export async function saveSleepPresets(presets: SleepPreset[]): Promise<void> {
  try {
    const json = JSON.stringify(presets);
    await AsyncStorage.setItem(PRESETS_STORAGE_KEY, json);
  } catch (error) {
    console.error('Error saving sleep presets:', error);
  }
}

export async function loadSleepPresets(): Promise<SleepPreset[]> {
  try {
    const json = await AsyncStorage.getItem(PRESETS_STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error loading sleep presets:', error);
    return [];
  }
}
