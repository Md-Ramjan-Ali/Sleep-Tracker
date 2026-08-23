import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  CloudRain,
  Zap,
  Waves,
  Wind,
  Moon,
  Flame,
  Radio,
  Bell,
  Play,
  Pause,
  Volume2,
} from 'lucide-react-native';
import { useSleepStore } from '../store/useSleepStore';
import { SoundCategory } from '../types/sleep';

const ICON_MAP: Record<string, any> = {
  CloudRain,
  Zap,
  Waves,
  Wind,
  Moon,
  Flame,
  Radio,
  Bell,
};

export const SoundMixer: React.FC = () => {
  const sounds = useSleepStore((state) => state.sounds);
  const activeCategory = useSleepStore((state) => state.activeCategory);
  const setActiveCategory = useSleepStore((state) => state.setActiveCategory);
  const toggleSound = useSleepStore((state) => state.toggleSound);
  const setSoundVolume = useSleepStore((state) => state.setSoundVolume);

  const categories: { key: SoundCategory; label: string }[] = [
    { key: 'all', label: 'All Sounds' },
    { key: 'rain', label: 'Rain' },
    { key: 'nature', label: 'Nature' },
    { key: 'ambient', label: 'Ambient' },
    { key: 'meditation', label: 'Meditation' },
  ];

  const filteredSounds = sounds.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  );

  return (
    <View style={styles.container}>
      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[styles.pill, isSelected ? styles.pillSelected : null]}
              onPress={() => setActiveCategory(cat.key)}
              activeOpacity={0.8}
            >
              <Text style={[styles.pillText, isSelected ? styles.pillTextSelected : null]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Sound Cards Grid */}
      <View style={styles.grid}>
        {filteredSounds.map((sound) => {
          const IconComponent = ICON_MAP[sound.iconName] || Moon;
          return (
            <View
              key={sound.id}
              style={[
                styles.card,
                sound.isPlaying ? { borderColor: sound.color, backgroundColor: '#111827' } : null,
              ]}
            >
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleSound(sound.id)}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.iconCircle,
                    sound.isPlaying ? { backgroundColor: sound.color + '25' } : null,
                  ]}
                >
                  <IconComponent size={22} color={sound.isPlaying ? sound.color : '#9CA3AF'} />
                </View>

                <View style={styles.titleCol}>
                  <Text style={styles.soundName}>{sound.name}</Text>
                  <Text style={styles.soundCategory}>{sound.category.toUpperCase()}</Text>
                </View>

                <View
                  style={[
                    styles.playBtn,
                    sound.isPlaying ? { backgroundColor: sound.color } : styles.playBtnInactive,
                  ]}
                >
                  {sound.isPlaying ? (
                    <Pause size={14} color="#FFFFFF" fill="#FFFFFF" />
                  ) : (
                    <Play size={14} color="#9CA3AF" fill="#9CA3AF" />
                  )}
                </View>
              </TouchableOpacity>

              {/* Volume Slider Controls */}
              {sound.isPlaying ? (
                <View style={styles.volumeRow}>
                  <Volume2 size={14} color={sound.color} />
                  <View style={styles.volumeTrackGroup}>
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => {
                      const isActiveStep = sound.volume >= v - 0.05;
                      return (
                        <TouchableOpacity
                          key={v}
                          style={[
                            styles.volumeStep,
                            isActiveStep
                              ? { backgroundColor: sound.color }
                              : styles.volumeStepInactive,
                          ]}
                          onPress={() => setSoundVolume(sound.id, v)}
                        />
                      );
                    })}
                  </View>
                  <Text style={styles.volumeValueText}>
                    {Math.round(sound.volume * 100)}%
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 12,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  pillSelected: {
    backgroundColor: '#312E81',
    borderColor: '#6366F1',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  pillTextSelected: {
    color: '#F9FAFB',
  },
  grid: {
    paddingHorizontal: 16,
    gap: 10,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCol: {
    flex: 1,
  },
  soundName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 2,
  },
  soundCategory: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  playBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnInactive: {
    backgroundColor: '#1F2937',
  },
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  volumeTrackGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  volumeStep: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  volumeStepInactive: {
    backgroundColor: '#1F2937',
  },
  volumeValueText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    width: 34,
    textAlign: 'right',
  },
});
