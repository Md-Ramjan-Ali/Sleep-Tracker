import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { X, ChevronUp, ChevronDown } from 'lucide-react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (reminderTime: string, days: string[]) => void;
}

export const BedtimeReminderModal: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const daysList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [selectedDays, setSelectedDays] = useState<string[]>(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
  const [hour, setHour] = useState(22);
  const [minute, setMinute] = useState(0);

  const toggleDay = (index: number) => {
    const dayKey = `${daysList[index]}_${index}`;
    if (selectedDays.includes(dayKey)) {
      setSelectedDays(selectedDays.filter((d) => d !== dayKey));
    } else {
      setSelectedDays([...selectedDays, dayKey]);
    }
  };

  const handleHourChange = (delta: number) => {
    let next = hour + delta;
    if (next < 0) next = 23;
    if (next > 23) next = 0;
    setHour(next);
  };

  const handleMinuteChange = (delta: number) => {
    let next = minute + delta;
    if (next < 0) next = 55;
    if (next > 59) next = 0;
    setMinute(next);
  };

  const formatHour = (h: number) => (h < 10 ? `0${h}` : `${h}`);
  const formatMinute = (m: number) => (m < 10 ? `0${m}` : `${m}`);

  const handleSetReminder = () => {
    const timeStr = `${formatHour(hour)}:${formatMinute(minute)}`;
    onConfirm(timeStr, selectedDays);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Top Left Close Icon */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <X size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Main Title & Subtitle */}
          <Text style={styles.title}>Set Your Bedtime Reminder</Text>
          <Text style={styles.subtitle}>
            Consistent bedtime improves sleep quality and helps your body recover better
          </Text>

          {/* Reminding Days */}
          <Text style={styles.sectionLabel}>Reminding Days</Text>
          <View style={styles.daysRow}>
            {daysList.map((day, idx) => {
              const dayKey = `${day}_${idx}`;
              const isSelected = selectedDays.includes(dayKey);
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.dayCircle, isSelected ? styles.dayCircleSelected : null]}
                  onPress={() => toggleDay(idx)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dayText, isSelected ? styles.dayTextSelected : null]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Time Picker Wheel Box */}
          <View style={styles.timePickerContainer}>
            {/* Top Preview Line */}
            <View style={styles.wheelPreviewRow}>
              <Text style={styles.wheelPreviewText}>{formatHour((hour - 1 + 24) % 24)}</Text>
              <Text style={styles.wheelPreviewText}>
                {formatMinute((minute - 5 + 60) % 60)}
              </Text>
            </View>

            {/* Selected Main Pill */}
            <View style={styles.selectedTimePill}>
              <View style={styles.timeCol}>
                <TouchableOpacity onPress={() => handleHourChange(-1)} style={styles.arrowTouch}>
                  <ChevronUp size={18} color="#94A3B8" />
                </TouchableOpacity>
                <Text style={styles.timeValueText}>{formatHour(hour)}</Text>
                <TouchableOpacity onPress={() => handleHourChange(1)} style={styles.arrowTouch}>
                  <ChevronDown size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <Text style={styles.colonSeparator}>:</Text>

              <View style={styles.timeCol}>
                <TouchableOpacity onPress={() => handleMinuteChange(-5)} style={styles.arrowTouch}>
                  <ChevronUp size={18} color="#94A3B8" />
                </TouchableOpacity>
                <Text style={styles.timeValueText}>{formatMinute(minute)}</Text>
                <TouchableOpacity onPress={() => handleMinuteChange(5)} style={styles.arrowTouch}>
                  <ChevronDown size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom Preview Line */}
            <View style={styles.wheelPreviewRow}>
              <Text style={styles.wheelPreviewText}>{formatHour((hour + 1) % 24)}</Text>
              <Text style={styles.wheelPreviewText}>{formatMinute((minute + 5) % 60)}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.setReminderBtn} onPress={handleSetReminder} activeOpacity={0.85}>
            <Text style={styles.setReminderText}>Set Reminder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.skipText}>Don't remind me</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  closeBtn: {
    padding: 6,
    alignSelf: 'flex-start',
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 14,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 36,
  },
  dayCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    backgroundColor: '#007AFF',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
  },
  dayTextSelected: {
    color: '#FFFFFF',
  },
  timePickerContainer: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  wheelPreviewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 36,
    paddingVertical: 8,
  },
  wheelPreviewText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#334155',
  },
  selectedTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: '#0F172A',
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#334155',
    marginVertical: 6,
  },
  timeCol: {
    alignItems: 'center',
  },
  arrowTouch: {
    padding: 2,
  },
  timeValueText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  colonSeparator: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bottomActions: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  setReminderBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
  },
  setReminderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94A3B8',
  },
});
