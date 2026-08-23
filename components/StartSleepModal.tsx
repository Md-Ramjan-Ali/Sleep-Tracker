import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Moon, ChevronUp, ChevronDown } from 'lucide-react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onStartSleepSession: (alarmTime: string | null, isSmart: boolean) => void;
}

export const StartSleepModal: React.FC<Props> = ({
  visible,
  onClose,
  onStartSleepSession,
}) => {
  const [alarmMode, setAlarmMode] = useState<'smart' | 'standard'>('smart');
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(30);

  const handleHourChange = (delta: number) => {
    let next = hour + delta;
    if (next < 1) next = 12;
    if (next > 12) next = 1;
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

  const getSmartWindow = () => {
    let startMin = minute - 30;
    let startHr = hour;
    if (startMin < 0) {
      startMin += 60;
      startHr = hour - 1 < 1 ? 12 : hour - 1;
    }
    return `${formatHour(startHr)}:${formatMinute(startMin)} - ${formatHour(hour)}:${formatMinute(minute)}`;
  };

  const handleStart = () => {
    const timeStr = `${formatHour(hour)}:${formatMinute(minute)}`;
    onStartSleepSession(timeStr, alarmMode === 'smart');
  };

  const handleSkip = () => {
    onStartSleepSession(null, false);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Main Content Area */}
        <View style={styles.content}>
          {/* Time Picker Wheel Container */}
          <View style={styles.timePickerContainer}>
            {/* Top Preview Line */}
            <View style={styles.wheelPreviewRow}>
              <Text style={styles.wheelPreviewText}>{formatHour(hour - 1 < 1 ? 12 : hour - 1)}</Text>
              <Text style={styles.wheelPreviewText}>
                {formatMinute((minute - 5 + 60) % 60)}
              </Text>
            </View>

            {/* Selected Main Pill Box */}
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
              <Text style={styles.wheelPreviewText}>{formatHour(hour + 1 > 12 ? 1 : hour + 1)}</Text>
              <Text style={styles.wheelPreviewText}>{formatMinute((minute + 5) % 60)}</Text>
            </View>
          </View>

          {/* Segmented Alarm Mode Toggle */}
          <View style={styles.segmentedToggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, alarmMode === 'smart' ? styles.toggleBtnActive : null]}
              onPress={() => setAlarmMode('smart')}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.toggleText, alarmMode === 'smart' ? styles.toggleTextActive : null]}
              >
                Smart Alarm
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, alarmMode === 'standard' ? styles.toggleBtnActive : null]}
              onPress={() => setAlarmMode('standard')}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.toggleText, alarmMode === 'standard' ? styles.toggleTextActive : null]}
              >
                Alarm
              </Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Mode Subtext */}
          {alarmMode === 'smart' ? (
            <View style={styles.modeInfoBox}>
              <Text style={styles.modeInfoTitle}>Smart wake-up between:</Text>
              <Text style={styles.modeInfoValue}>{getSmartWindow()}</Text>
            </View>
          ) : (
            <View style={styles.modeInfoBox}>
              <Text style={styles.modeInfoTitle}>Wake-up:</Text>
              <Text style={styles.modeInfoValue}>
                {formatHour(hour)}:{formatMinute(minute)}
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.startSleepBtn} onPress={handleStart} activeOpacity={0.85}>
            <Moon size={20} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.startSleepText}>Start Sleep</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip} activeOpacity={0.8}>
            <Text style={styles.skipText}>Skip Alarm</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  timePickerContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  wheelPreviewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 10,
  },
  wheelPreviewText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#334155',
  },
  selectedTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: '#0B0F19',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 34,
    borderWidth: 1.5,
    borderColor: '#334155',
    marginVertical: 8,
  },
  timeCol: {
    alignItems: 'center',
  },
  arrowTouch: {
    padding: 2,
  },
  timeValueText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  colonSeparator: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  segmentedToggle: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 4,
    width: '85%',
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  toggleBtnActive: {
    backgroundColor: '#334155',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  modeInfoBox: {
    alignItems: 'center',
    marginTop: 8,
  },
  modeInfoTitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  modeInfoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomActions: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  startSleepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  startSleepText: {
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
