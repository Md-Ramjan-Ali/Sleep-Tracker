import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Clock, Volume2, Square } from 'lucide-react-native';
import { useSleepStore } from '../store/useSleepStore';

interface Props {
  onOpenTimer: () => void;
}

export const Header: React.FC<Props> = ({ onOpenTimer }) => {
  const sounds = useSleepStore((state) => state.sounds);
  const stopAllSounds = useSleepStore((state) => state.stopAllSounds);
  const timerMinutes = useSleepStore((state) => state.timerMinutes);
  const timerRemainingSeconds = useSleepStore((state) => state.timerRemainingSeconds);

  const playingSoundsCount = sounds.filter((s) => s.isPlaying).length;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandingRow}>
        <Image
          source={require('../assets/icon.png')}
          style={styles.logoImage}
          resizeMode="cover"
        />
        <View style={styles.titleCol}>
          <Text style={styles.appName}>Sleep Tracker & Sounds</Text>
          <Text style={styles.companyName}>BY PLAXORA GROUP</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        {/* Timer Button */}
        <TouchableOpacity style={styles.timerBtn} onPress={onOpenTimer} activeOpacity={0.8}>
          <Clock size={16} color={timerMinutes ? '#818CF8' : '#94A3B8'} />
          <Text style={[styles.timerText, timerMinutes ? styles.timerTextActive : null]}>
            {timerRemainingSeconds !== null ? formatTimer(timerRemainingSeconds) : 'Timer'}
          </Text>
        </TouchableOpacity>

        {/* Active Sound Indicator & Stop All */}
        {playingSoundsCount > 0 ? (
          <TouchableOpacity style={styles.stopBtn} onPress={stopAllSounds} activeOpacity={0.8}>
            <Volume2 size={16} color="#EC4899" />
            <Text style={styles.stopBtnText}>{playingSoundsCount} Playing</Text>
            <Square size={10} color="#EC4899" fill="#EC4899" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#0B0F19',
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#312E81',
  },
  titleCol: {
    justifyContent: 'center',
  },
  appName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#F9FAFB',
    letterSpacing: 0.3,
  },
  companyName: {
    fontSize: 10,
    fontWeight: '800',
    color: '#818CF8',
    letterSpacing: 1.2,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#374151',
  },
  timerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  timerTextActive: {
    color: '#818CF8',
    fontWeight: '700',
  },
  stopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(236, 72, 153, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  stopBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EC4899',
  },
});
