import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Clock, X, Check } from 'lucide-react-native';
import { useSleepStore } from '../store/useSleepStore';
import { SleepTimerOption } from '../types/sleep';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const SleepTimerModal: React.FC<Props> = ({ visible, onClose }) => {
  const timerMinutes = useSleepStore((state) => state.timerMinutes);
  const setSleepTimer = useSleepStore((state) => state.setSleepTimer);
  const clearSleepTimer = useSleepStore((state) => state.clearSleepTimer);

  const timerOptions: { minutes: SleepTimerOption; label: string }[] = [
    { minutes: 15, label: '15 Minutes' },
    { minutes: 30, label: '30 Minutes' },
    { minutes: 45, label: '45 Minutes' },
    { minutes: 60, label: '1 Hour' },
    { minutes: 90, label: '1.5 Hours' },
    { minutes: 120, label: '2 Hours' },
  ];

  const handleSelect = (mins: SleepTimerOption) => {
    setSleepTimer(mins);
    onClose();
  };

  const handleClear = () => {
    clearSleepTimer();
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <View style={styles.titleGroup}>
              <Clock size={20} color="#818CF8" />
              <Text style={styles.title}>Sleep Audio Timer</Text>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>
            Audio playback will automatically stop when the timer finishes.
          </Text>

          <View style={styles.optionsList}>
            {timerOptions.map((opt) => {
              const isSelected = timerMinutes === opt.minutes;
              return (
                <TouchableOpacity
                  key={opt.minutes}
                  style={[styles.optionRow, isSelected ? styles.optionRowSelected : null]}
                  onPress={() => handleSelect(opt.minutes)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.optionText, isSelected ? styles.optionTextSelected : null]}>
                    {opt.label}
                  </Text>
                  {isSelected ? <Check size={18} color="#818CF8" /> : null}
                </TouchableOpacity>
              );
            })}
          </View>

          {timerMinutes ? (
            <TouchableOpacity style={styles.clearBtn} onPress={handleClear} activeOpacity={0.8}>
              <Text style={styles.clearBtnText}>Turn Off Timer</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#0B0F19',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  closeBtn: {
    padding: 6,
  },
  subTitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  optionsList: {
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  optionRowSelected: {
    backgroundColor: '#1E1B4B',
    borderColor: '#6366F1',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D1D5DB',
  },
  optionTextSelected: {
    color: '#818CF8',
    fontWeight: '700',
  },
  clearBtn: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  clearBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
  },
});
