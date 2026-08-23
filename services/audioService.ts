import { Audio } from 'expo-av';
import { AmbientSound } from '../types/sleep';

class AudioEngine {
  private activeSounds: Map<string, Audio.Sound> = new Map();

  constructor() {
    this.configureAudioMode();
  }

  private async configureAudioMode() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      console.warn('Error setting audio mode:', error);
    }
  }

  async playTrack(id: string, url: string, volume: number): Promise<boolean> {
    try {
      // If already playing, update volume
      if (this.activeSounds.has(id)) {
        const existingSound = this.activeSounds.get(id);
        await existingSound?.setVolumeAsync(volume);
        return true;
      }

      // Create new sound instance
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true, isLooping: true, volume }
      );

      this.activeSounds.set(id, sound);
      return true;
    } catch (error) {
      console.error(`Error playing sound ${id}:`, error);
      return false;
    }
  }

  async stopTrack(id: string): Promise<void> {
    try {
      const sound = this.activeSounds.get(id);
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        this.activeSounds.delete(id);
      }
    } catch (error) {
      console.warn(`Error stopping sound ${id}:`, error);
    }
  }

  async setTrackVolume(id: string, volume: number): Promise<void> {
    try {
      const sound = this.activeSounds.get(id);
      if (sound) {
        await sound.setVolumeAsync(volume);
      }
    } catch (error) {
      console.warn(`Error setting volume for ${id}:`, error);
    }
  }

  async stopAllTracks(): Promise<void> {
    for (const [id, sound] of this.activeSounds.entries()) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
      } catch (e) {
        // ignore individual errors during cleanup
      }
    }
    this.activeSounds.clear();
  }
}

export const audioEngine = new AudioEngine();

export const INITIAL_AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: 'rain_heavy',
    name: 'Heavy Rain',
    category: 'rain',
    iconName: 'CloudRain',
    audioUrl: 'https://cdn.freesound.org/previews/530/530415_11674406-lq.mp3',
    volume: 0.8,
    isPlaying: false,
    color: '#3B82F6',
  },
  {
    id: 'thunder_soft',
    name: 'Soft Thunder',
    category: 'rain',
    iconName: 'Zap',
    audioUrl: 'https://cdn.freesound.org/previews/442/442903_8930438-lq.mp3',
    volume: 0.6,
    isPlaying: false,
    color: '#8B5CF6',
  },
  {
    id: 'ocean_waves',
    name: 'Ocean Waves',
    category: 'nature',
    iconName: 'Waves',
    audioUrl: 'https://cdn.freesound.org/previews/415/415209_5121236-lq.mp3',
    volume: 0.75,
    isPlaying: false,
    color: '#06B6D4',
  },
  {
    id: 'forest_wind',
    name: 'Forest Wind',
    category: 'nature',
    iconName: 'Wind',
    audioUrl: 'https://cdn.freesound.org/previews/518/518850_10793130-lq.mp3',
    volume: 0.65,
    isPlaying: false,
    color: '#10B981',
  },
  {
    id: 'night_crickets',
    name: 'Night Crickets',
    category: 'nature',
    iconName: 'Moon',
    audioUrl: 'https://cdn.freesound.org/previews/585/585093_11861866-lq.mp3',
    volume: 0.5,
    isPlaying: false,
    color: '#6366F1',
  },
  {
    id: 'cozy_fire',
    name: 'Cozy Fireplace',
    category: 'ambient',
    iconName: 'Flame',
    audioUrl: 'https://cdn.freesound.org/previews/434/434612_8741369-lq.mp3',
    volume: 0.7,
    isPlaying: false,
    color: '#F97316',
  },
  {
    id: 'white_noise',
    name: 'Deep White Noise',
    category: 'ambient',
    iconName: 'Radio',
    audioUrl: 'https://cdn.freesound.org/previews/387/387342_7255428-lq.mp3',
    volume: 0.5,
    isPlaying: false,
    color: '#94A3B8',
  },
  {
    id: 'meditation_bell',
    name: 'Zen Bell & Bowl',
    category: 'meditation',
    iconName: 'Bell',
    audioUrl: 'https://cdn.freesound.org/previews/521/521996_10522073-lq.mp3',
    volume: 0.6,
    isPlaying: false,
    color: '#EC4899',
  },
];
