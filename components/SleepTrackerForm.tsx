import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Sun, Check, Coffee, Utensils, Activity, Zap, Smartphone, Wine, X } from 'lucide-react-native';
import { useSleepStore } from '../store/useSleepStore';
import { MorningMood, SleepFactor } from '../types/sleep';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const SleepTrackerForm: React.FC<Props> = ({ visible, onClose }) => {
  const endNightSession = useSleepStore((state) => state.endNightSession);

  const [selectedMood, setSelectedMood] = useState<MorningMood>('rested');
  const [selectedFactors, setSelectedFactors] = useState<SleepFactor[]>([]);

  const moods: { key: MorningMood; label: string; emoji: string }[] = [
    { key: 'energized', label: 'Energized', emoji: '😃' },
    { key: 'rested', label: 'Rested', emoji: '😊' },
    { key: 'tired', label: 'Tired', emoji: '😴' },
    { key: 'exhausted', label: 'Exhausted', emoji: '😫' },
  ];

  const factorOptions: { key: SleepFactor; label: string; icon: any }[] = [
    { key: 'caffeine', label: 'Caffeine', icon: Coffee },
    { key: 'late_meal', label: 'Late Meal', icon: Utensils },
    { key: 'exercise', label: 'Exercise', icon: Activity },
    { key: 'stress', label: 'Stress', icon: Zap },
    { key: 'screen_time', label: 'Screen Time', icon: Smartphone },
    { key: 'alcohol', label: 'Alcohol', icon: Wine },
  ];

  const toggleFactor = (factor: SleepFactor) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter((f) => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  const handleSave = async () => {
    await endNightSession(selectedMood, selectedFactors);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <View style={styles.titleGroup}>
              <Sun size={22} color="#F59E0B" />
              <Text style={styles.title}>Good Morning!</Text>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Morning Mood */}
            <Text style={styles.sectionLabel}>How do you feel this morning?</Text>
            <View style={styles.moodGrid}>
              {moods.map((m) => {
                const isSelected = selectedMood === m.key;
                return (
                  <TouchableOpacity
                    key={m.key}
                    style={[styles.moodCard, isSelected ? styles.moodCardSelected : null]}
                    onPress={() => setSelectedMood(m.key)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.emojiText}>{m.emoji}</Text>
                    <Text style={[styles.moodLabel, isSelected ? styles.moodLabelSelected : null]}>
                      {m.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Bedtime Factors */}
            <Text style={styles.sectionLabel}>Any bedtime factors last night?</Text>
            <View style={styles.factorsGrid}>
              {factorOptions.map((f) => {
                const Icon = f.icon;
                const isSelected = selectedFactors.includes(f.key);
                return (
                  <TouchableOpacity
                    key={f.key}
                    style={[styles.factorPill, isSelected ? styles.factorPillSelected : null]}
                    onPress={() => toggleFactor(f.key)}
                    activeOpacity={0.8}
                  >
                    <Icon size={16} color={isSelected ? '#818CF8' : '#9CA3AF'} />
                    <Text style={[styles.factorText, isSelected ? styles.factorTextSelected : null]}>
                      {f.label}
                    </Text>
                    {isSelected ? <Check size={14} color="#818CF8" /> : null}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Save Action */}
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
              <Text style={styles.saveBtnText}>Save Night Session & Score</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#0B0F19',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  closeBtn: {
    padding: 6,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 10,
    marginTop: 6,
  },
  moodGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  moodCard: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1F2937',
  },
  moodCardSelected: {
    backgroundColor: '#1E1B4B',
    borderColor: '#6366F1',
  },
  emojiText: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  moodLabelSelected: {
    color: '#818CF8',
    fontWeight: '700',
  },
  factorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  factorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  factorPillSelected: {
    backgroundColor: '#1E1B4B',
    borderColor: '#6366F1',
  },
  factorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  factorTextSelected: {
    color: '#F9FAFB',
  },
  saveBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
