import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  Tent,
  Activity,
  Bed,
  Waves,
  Gem,
  Volume2,
  Square,
  VolumeX,
} from 'lucide-react-native';
import { useSleepStore } from '../store/useSleepStore';

export const SoundsScreen: React.FC = () => {
  const sounds = useSleepStore((state) => state.sounds);
  const toggleSound = useSleepStore((state) => state.toggleSound);
  const stopAllSounds = useSleepStore((state) => state.stopAllSounds);

  const playingSounds = sounds.filter((s) => s.isPlaying);

  const whiteNoiseCards = [
    {
      id: 'rain_tent',
      soundId: 'rain_tent',
      title: 'Rain on Tent',
      sub: 'Nature',
      icon: Tent,
    },
    {
      id: 'brainwaves',
      soundId: 'brainwaves',
      title: 'Brainwaves',
      sub: 'Colored Noises',
      icon: Activity,
    },
    {
      id: 'room_noise',
      soundId: 'room_noise',
      title: 'Room Noise',
      sub: 'Colored Noises',
      icon: Bed,
    },
    {
      id: 'pink_noise',
      soundId: 'pink_noise',
      title: 'Pink Noise',
      sub: 'Colored Noises',
      icon: Waves,
    },
  ];

  const musicCards = [
    {
      id: 'stream',
      soundId: 'water_stream',
      title: 'Water Stream in...',
      sub: 'Nature',
      duration: '5 min',
      image: require('../assets/stream.png'),
    },
    {
      id: 'strength',
      soundId: 'inner_strength',
      title: 'Your Inner Streng...',
      sub: 'Healing',
      duration: '4 min',
      image: require('../assets/strength.png'),
    },
    {
      id: 'galaxy',
      soundId: 'beyond_galaxy',
      title: 'Beyond Galaxy',
      sub: 'Special',
      duration: '7 min',
      image: require('../assets/slumber.png'),
    },
  ];

  const meditationCards = [
    {
      id: 'ease_mind',
      soundId: 'ease_mind',
      title: 'Ease the Mind',
      sub: 'Meditation',
      duration: '5 min',
      image: require('../assets/ease.png'),
    },
    {
      id: 'deep_slumber',
      soundId: 'deep_slumber',
      title: 'Deep Slumber',
      sub: 'Sleep',
      duration: '6 min',
      image: require('../assets/slumber.png'),
    },
    {
      id: 'calm_waves',
      soundId: 'calm_waves',
      title: 'Calm Your Waves',
      sub: 'Relax',
      duration: '4 min',
      image: require('../assets/stream.png'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sounds</Text>

        {playingSounds.length > 0 ? (
          <TouchableOpacity
            style={styles.stopAllHeaderBtn}
            onPress={stopAllSounds}
            activeOpacity={0.8}
          >
            <VolumeX size={16} color="#EF4444" />
            <Text style={styles.stopAllHeaderText}>Mute All</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Active Sound Playing Bar */}
      {playingSounds.length > 0 ? (
        <View style={styles.activePlayingBar}>
          <Volume2 size={20} color="#38BDF8" />
          <View style={styles.activePlayingTextCol}>
            <Text style={styles.activePlayingTitle} numberOfLines={1}>
              {playingSounds.map((s) => s.name).join(', ')}
            </Text>
            <Text style={styles.activePlayingSub}>Playing Now</Text>
          </View>

          <TouchableOpacity style={styles.stopIconBtn} onPress={stopAllSounds} activeOpacity={0.8}>
            <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Section 1: White Noise */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>White Noise</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.whiteNoiseGrid}>
        {whiteNoiseCards.map((card) => {
          const Icon = card.icon;
          const targetSound = sounds.find((s) => s.id === card.soundId);
          const isPlaying = targetSound?.isPlaying;

          return (
            <TouchableOpacity
              key={card.id}
              style={[styles.noiseCard, isPlaying ? styles.noiseCardPlaying : null]}
              onPress={() => toggleSound(card.soundId)}
              activeOpacity={0.8}
            >
              <View style={styles.noiseIconBox}>
                <Icon size={24} color={isPlaying ? '#3B82F6' : '#94A3B8'} />
                <View style={styles.diamondBadge}>
                  <Gem size={10} color="#FFFFFF" fill="#00D2FF" />
                </View>
              </View>

              <View style={styles.noiseTextCol}>
                <Text style={styles.noiseTitle} numberOfLines={1}>
                  {card.title}
                </Text>
                <Text style={styles.noiseSub}>{card.sub}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Section 2: Music */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Music</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {musicCards.map((card) => {
          const targetSound = sounds.find((s) => s.id === card.soundId);
          const isPlaying = targetSound?.isPlaying;

          return (
            <TouchableOpacity
              key={card.id}
              style={styles.artworkCard}
              onPress={() => toggleSound(card.soundId)}
              activeOpacity={0.85}
            >
              <View style={styles.imageContainer}>
                <Image source={card.image} style={styles.cardImage} resizeMode="cover" />

                {/* Duration Badge */}
                <View style={styles.durationTag}>
                  <Text style={styles.durationText}>{card.duration}</Text>
                </View>

                {/* Diamond Badge */}
                <View style={styles.imageDiamondBadge}>
                  <Gem size={12} color="#FFFFFF" fill="#00D2FF" />
                </View>

                {/* Playing Indicator Overlay */}
                {isPlaying ? (
                  <View style={styles.playingOverlay}>
                    <Volume2 size={24} color="#FFFFFF" />
                  </View>
                ) : null}
              </View>

              <Text style={styles.cardTitle} numberOfLines={1}>
                {card.title}
              </Text>
              <Text style={styles.cardSub}>{card.sub}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Section 3: Meditation */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Meditation</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {meditationCards.map((card) => {
          const targetSound = sounds.find((s) => s.id === card.soundId);
          const isPlaying = targetSound?.isPlaying;

          return (
            <TouchableOpacity
              key={card.id}
              style={styles.artworkCard}
              onPress={() => toggleSound(card.soundId)}
              activeOpacity={0.85}
            >
              <View style={styles.imageContainer}>
                <Image source={card.image} style={styles.cardImage} resizeMode="cover" />

                {/* Duration Badge */}
                <View style={styles.durationTag}>
                  <Text style={styles.durationText}>{card.duration}</Text>
                </View>

                {/* Playing Indicator Overlay */}
                {isPlaying ? (
                  <View style={styles.playingOverlay}>
                    <Volume2 size={24} color="#FFFFFF" />
                  </View>
                ) : null}
              </View>

              <Text style={styles.cardTitle} numberOfLines={1}>
                {card.title}
              </Text>
              <Text style={styles.cardSub}>{card.sub}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
    paddingHorizontal: 18,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  stopAllHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3730A3',
  },
  stopAllHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EF4444',
  },
  activePlayingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  activePlayingTextCol: {
    flex: 1,
  },
  activePlayingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  activePlayingSub: {
    fontSize: 11,
    fontWeight: '500',
    color: '#38BDF8',
    marginTop: 1,
  },
  stopIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  whiteNoiseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  noiseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '48%',
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  noiseCardPlaying: {
    borderColor: '#3B82F6',
    backgroundColor: '#1E1B4B',
  },
  noiseIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  diamondBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: '#334155',
  },
  noiseTextCol: {
    flex: 1,
  },
  noiseTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  noiseSub: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  horizontalScroll: {
    gap: 14,
    paddingBottom: 24,
  },
  artworkCard: {
    width: 145,
  },
  imageContainer: {
    width: 145,
    height: 145,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
    backgroundColor: '#111827',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  durationTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  imageDiamondBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  playingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(59, 130, 246, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
});
