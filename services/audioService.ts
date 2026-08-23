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
    id: 'rain_tent',
    name: 'Rain on Tent',
    category: 'rain',
    iconName: 'Tent',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    volume: 0.8,
    isPlaying: false,
    color: '#3B82F6',
  },
  {
    id: 'brainwaves',
    name: 'Brainwaves',
    category: 'ambient',
    iconName: 'Activity',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    volume: 0.7,
    isPlaying: false,
    color: '#818CF8',
  },
  {
    id: 'room_noise',
    name: 'Room Noise',
    category: 'ambient',
    iconName: 'Bed',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    volume: 0.65,
    isPlaying: false,
    color: '#6366F1',
  },
  {
    id: 'pink_noise',
    name: 'Pink Noise',
    category: 'ambient',
    iconName: 'Waves',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    volume: 0.6,
    isPlaying: false,
    color: '#EC4899',
  },
  {
    id: 'water_stream',
    name: 'Water Stream in Forest',
    category: 'nature',
    iconName: 'Droplets',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    volume: 0.8,
    isPlaying: false,
    color: '#38BDF8',
  },
  {
    id: 'inner_strength',
    name: 'Your Inner Strength',
    category: 'nature',
    iconName: 'Zap',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    volume: 0.75,
    isPlaying: false,
    color: '#F59E0B',
  },
  {
    id: 'beyond_galaxy',
    name: 'Beyond Galaxy',
    category: 'nature',
    iconName: 'Moon',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    volume: 0.7,
    isPlaying: false,
    color: '#A855F7',
  },
  {
    id: 'ease_mind',
    name: 'Ease the Mind',
    category: 'meditation',
    iconName: 'Flower2',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    volume: 0.75,
    isPlaying: false,
    color: '#34D399',
  },
  {
    id: 'deep_slumber',
    name: 'Deep Slumber',
    category: 'meditation',
    iconName: 'Moon',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    volume: 0.8,
    isPlaying: false,
    color: '#818CF8',
  },
  {
    id: 'calm_waves',
    name: 'Calm Your Waves',
    category: 'meditation',
    iconName: 'Waves',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    volume: 0.7,
    isPlaying: false,
    color: '#06B6D4',
  },
  {
    id: 'rain_heavy',
    name: 'Heavy Rain',
    category: 'rain',
    iconName: 'CloudRain',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    volume: 0.8,
    isPlaying: false,
    color: '#3B82F6',
  },
  {
    id: 'thunder_soft',
    name: 'Soft Thunder',
    category: 'rain',
    iconName: 'Zap',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    volume: 0.6,
    isPlaying: false,
    color: '#8B5CF6',
  },
  {
    id: 'cozy_fire',
    name: 'Cozy Fireplace',
    category: 'ambient',
    iconName: 'Flame',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    volume: 0.7,
    isPlaying: false,
    color: '#F97316',
  },
  {
    id: 'white_noise',
    name: 'Deep White Noise',
    category: 'ambient',
    iconName: 'Radio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    volume: 0.5,
    isPlaying: false,
    color: '#94A3B8',
  },
];
