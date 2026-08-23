import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Moon, Sun, Sparkles } from 'lucide-react-native';
import { useSleepStore } from '../store/useSleepStore';
import { SleepTrackerForm } from './SleepTrackerForm';

export const NightModeScreen: React.FC = () => {
  const isNightModeActive = useSleepStore((state) => state.isNightModeActive);
  const activeBedtimeISO = useSleepStore((state) => state.activeBedtimeISO);
  const startNightSession = useSleepStore((state) => state.startNightSession);

  const [currentTime, setCurrentTime] = useState('');
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [showWakeForm, setShowWakeForm] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const mins = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${mins < 10 ? '0' : ''}${mins} ${ampm}`);

      if (activeBedtimeISO) {
        const bedMs = new Date(activeBedtimeISO).getTime();
        const diff = Math.max(0, now.getTime() - bedMs);
        setElapsedMinutes(Math.floor(diff / (1000 * 60)));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [activeBedtimeISO]);

  const formatElapsed = (totalMins: number) => {
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return `${hrs}h ${mins}m`;
  };

  return (
    <View style={styles.card}>
      {!isNightModeActive ? (
        <View style={styles.idleState}>
          <View style={styles.moonGlowCircle}>
            <Moon size={40} color="#818CF8" fill="#312E81" />
          </View>

          <Text style={styles.idleTitle}>Bedtime Sleep Tracker</Text>
          <Text style={styles.idleSub}>
            Start your night session to track sleep duration & quality score.
          </Text>

          <TouchableOpacity style={styles.startBedtimeBtn} onPress={startNightSession} activeOpacity={0.85}>
            <Moon size={18} color="#FFFFFF" />
            <Text style={styles.startBedtimeText}>Start Sleep Mode</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.activeState}>
          <View style={styles.liveClockHeader}>
            <Sparkles size={16} color="#818CF8" />
            <Text style={styles.liveClockText}>SLEEPING MODE ACTIVE</Text>
          </View>

          <Text style={styles.digitalClock}>{currentTime}</Text>

          <View style={styles.elapsedBadge}>
            <Text style={styles.elapsedLabel}>Sleeping for</Text>
            <Text style={styles.elapsedTime}>{formatElapsed(elapsedMinutes)}</Text>
          </View>

          <TouchableOpacity
            style={styles.wakeUpBtn}
            onPress={() => setShowWakeForm(true)}
            activeOpacity={0.85}
          >
            <Sun size={20} color="#F59E0B" />
            <Text style={styles.wakeUpText}>I'm Awake - Log Sleep</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Morning Mood & Factors Form Modal */}
      <SleepTrackerForm visible={showWakeForm} onClose={() => setShowWakeForm(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0B0F19',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    alignItems: 'center',
  },
  idleState: {
    alignItems: 'center',
  },
  moonGlowCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E1B4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#4338CA',
  },
  idleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 6,
  },
  idleSub: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    maxWidth: 260,
    marginBottom: 20,
    lineHeight: 18,
  },
  startBedtimeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  startBedtimeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  activeState: {
    alignItems: 'center',
    width: '100%',
  },
  liveClockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  liveClockText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#818CF8',
    letterSpacing: 1,
  },
  digitalClock: {
    fontSize: 38,
    fontWeight: '800',
    color: '#F9FAFB',
    letterSpacing: 1,
    marginBottom: 16,
  },
  elapsedBadge: {
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  elapsedLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  elapsedTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  wakeUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
  },
  wakeUpText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F59E0B',
  },
});
