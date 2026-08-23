import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  PanResponder,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Play, Pause, Square, Moon, Clock, Sparkles, ChevronRight, BellOff } from 'lucide-react-native';
import { useSleepStore } from '../store/useSleepStore';
import { SleepTrackerForm } from './SleepTrackerForm';

interface Props {
  visible: boolean;
  alarmTime: string | null;
  onClose: () => void;
}

const SLIDE_THRESHOLD = 150;

export const ActiveTrackingScreen: React.FC<Props> = ({
  visible,
  alarmTime,
  onClose,
}) => {
  const sounds = useSleepStore((state) => state.sounds);
  const toggleSound = useSleepStore((state) => state.toggleSound);

  const [currentTime, setCurrentTime] = useState('');
  const [ambientDb, setAmbientDb] = useState(42);
  const [showWakeForm, setShowWakeForm] = useState(false);

  const activePlayingSound = sounds.find((s) => s.isPlaying) || sounds[0];

  const slideAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx >= 0 && gestureState.dx <= 210) {
          slideAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= SLIDE_THRESHOLD) {
          Animated.timing(slideAnim, {
            toValue: 210,
            duration: 150,
            useNativeDriver: false,
          }).start(() => {
            handleStopTracking();
            slideAnim.setValue(0);
          });
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            friction: 6,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);

      // Simulate subtle ambient noise fluctuation (38dB - 48dB)
      const randomDb = Math.floor(38 + Math.random() * 10);
      setAmbientDb(randomDb);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStopTracking = () => {
    setShowWakeForm(true);
  };

  const handleWakeFormClose = () => {
    setShowWakeForm(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.topBar}>
          {/* Top Left Tracking Indicator */}
          <View style={styles.trackingBadge}>
            <View style={styles.redDotPulse} />
            <Text style={styles.trackingText}>Tracking...</Text>
          </View>

          {/* Top Right Ambient Noise Indicator */}
          <View style={styles.noiseBadge}>
            <Text style={styles.noiseDbText}>{ambientDb}dB</Text>
            <Text style={styles.noiseLabel}>Ambient Noise</Text>
          </View>
        </View>

        {/* Center Clock & Alarm Section */}
        <View style={styles.centerClockSection}>
          <View style={styles.clockRow}>
            <Text style={styles.digitalClockText}>{currentTime}</Text>
            <Moon size={18} color="#94A3B8" style={styles.moonIcon} />
          </View>

          {/* Alarm Badge Pill */}
          {alarmTime ? (
            <View style={styles.alarmPillBadge}>
              <Clock size={14} color="#38BDF8" />
              <Text style={styles.alarmPillText}>Alarm {alarmTime}</Text>
            </View>
          ) : (
            <View style={styles.noAlarmPillBadge}>
              <BellOff size={14} color="#64748B" />
              <Text style={styles.noAlarmPillText}>No Alarm Set (Silent Sleep)</Text>
            </View>
          )}
        </View>

        {/* Center Waveform Visualizer */}
        <View style={styles.waveformContainer}>
          <Svg width={340} height={80} viewBox="0 0 340 80">
            <Path
              d="M 0 40 Q 85 10, 170 40 T 340 40"
              stroke="#6366F1"
              strokeWidth="2.5"
              fill="none"
              opacity="0.8"
            />
            <Path
              d="M 0 40 Q 85 65, 170 40 T 340 40"
              stroke="#818CF8"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <Path
              d="M 0 40 Q 85 25, 170 40 T 340 40"
              stroke="#38BDF8"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
          </Svg>
        </View>

        {/* Bottom Sound Controller & Stop Action */}
        <View style={styles.bottomSection}>
          {/* Active Sound Card */}
          <View style={styles.soundControlRow}>
            <TouchableOpacity
              style={styles.soundCard}
              onPress={() => toggleSound(activePlayingSound.id)}
              activeOpacity={0.8}
            >
              <View style={styles.playIconBox}>
                {activePlayingSound.isPlaying ? (
                  <Pause size={16} color="#FFFFFF" fill="#FFFFFF" />
                ) : (
                  <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                )}
              </View>

              <View style={styles.soundInfoCol}>
                <Text style={styles.soundMainTitle}>{activePlayingSound.name}</Text>
                <Text style={styles.soundSubTitle}>{activePlayingSound.category.toUpperCase()}</Text>
              </View>

              <ChevronRight size={18} color="#64748B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.sparkleBtn} activeOpacity={0.8}>
              <Sparkles size={18} color="#818CF8" />
            </TouchableOpacity>
          </View>

          {/* Interactive Slide to Stop Gesture Bar */}
          <View style={styles.slideStopBar}>
            <Animated.View
              style={[
                styles.stopGlowCircle,
                { transform: [{ translateX: slideAnim }] },
              ]}
              {...panResponder.panHandlers}
            >
              <Square size={16} color="#FFFFFF" fill="#FFFFFF" />
            </Animated.View>

            <Text style={styles.slideStopText}>Slide to Stop</Text>
          </View>
        </View>

        {/* Wake-Up Journal Modal */}
        <SleepTrackerForm visible={showWakeForm} onClose={handleWakeFormClose} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  trackingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  redDotPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  trackingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  noiseBadge: {
    alignItems: 'flex-end',
  },
  noiseDbText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EF4444',
  },
  noiseLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  centerClockSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  digitalClockText: {
    fontSize: 64,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  moonIcon: {
    marginTop: 12,
  },
  alarmPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  alarmPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#38BDF8',
  },
  noAlarmPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  noAlarmPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  waveformContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  soundControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  soundCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  playIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundInfoCol: {
    flex: 1,
  },
  soundMainTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  soundSubTitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  sparkleBtn: {
    width: 52,
    height: 52,
    borderRadius: 20,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  slideStopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#1F2937',
    position: 'relative',
    height: 64,
  },
  stopGlowCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E1B4B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
    zIndex: 10,
  },
  slideStopText: {
    position: 'absolute',
    left: 0,
    right: 0,
    fontSize: 15,
    fontWeight: '700',
    color: '#94A3B8',
    textAlign: 'center',
  },
});
