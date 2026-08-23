import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  Droplet,
  Crown,
  Volume2,
  Wind,
  CloudMoon,
  Flower2,
  Sliders,
  CheckCircle2,
  Circle,
  Coffee,
  Heart,
  Moon,
  Smartphone,
  Bed,
  Sparkles,
  Clock,
  BookOpen,
  Zap,
  BookMarked,
  FileText,
  X,
  Play,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Props {
  onNavigateTab: (tab: string) => void;
  onStartSleep: () => void;
}

export const HomeScreen: React.FC<Props> = ({ onNavigateTab, onStartSleep }) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [streakCount, setStreakCount] = useState(0);

  // Toolkit Modals State
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  const checklistItems = [
    {
      id: 'caffeine',
      title: 'Skip caffeine after 2 pm',
      icon: Coffee,
      color: '#A855F7',
    },
    {
      id: 'heart_rate',
      title: 'Measure heart rate before bed',
      icon: Heart,
      color: '#EC4899',
    },
    {
      id: 'breathwork',
      title: '5 mins relaxing breathwork',
      icon: Wind,
      color: '#3B82F6',
    },
    {
      id: 'screen_time',
      title: 'Put phone away 30 mins before sleep',
      icon: Smartphone,
      color: '#10B981',
    },
  ];

  const toolkitItems = [
    { id: 'sounds', label: 'Sounds', icon: Volume2, color: '#818CF8' },
    { id: 'breathwork', label: 'Breathwork', icon: Wind, color: '#C084FC' },
    { id: 'dreambot', label: 'Dreambot', icon: CloudMoon, color: '#38BDF8' },
    { id: 'meditation', label: 'Meditation', icon: Flower2, color: '#34D399' },
    { id: 'mixer', label: 'Mixer', icon: Sliders, color: '#F472B6' },
    { id: 'nap', label: 'Nap Timer', icon: Zap, color: '#FBBF24' },
    { id: 'stories', label: 'Sleep Stories', icon: BookOpen, color: '#60A5FA' },
    { id: 'hygiene', label: 'Sleep Hygiene', icon: BookMarked, color: '#A7F3D0' },
    { id: 'journal', label: 'Dream Journal', icon: FileText, color: '#F472B6' },
  ];

  const toggleTask = (id: string) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter((t) => t !== id));
    } else {
      setCompletedTasks([...completedTasks, id]);
    }
  };

  const handleToolkitPress = (id: string) => {
    if (id === 'sounds' || id === 'mixer') {
      onNavigateTab('sounds');
    } else {
      setActiveModal(id);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      {/* Sleep Quality SVG Arch Gauge Section */}
      <View style={styles.gaugeSectionContainer}>
        <View style={styles.svgWrapper}>
          <Svg width={270} height={150} viewBox="0 0 270 150">
            <Path
              d="M 18 140 A 117 117 0 0 1 252 140"
              stroke="#1D3557"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
          </Svg>

          {/* Text & Action Inside Arc */}
          <View style={styles.archContentOverlay}>
            <Text style={styles.archTitle}>Sleep Quality</Text>
            <Text style={styles.archSub}>7 nights left</Text>

            <TouchableOpacity style={styles.trackBtn} onPress={onStartSleep} activeOpacity={0.85}>
              <Text style={styles.trackBtnText}>Track</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.gaugeInstruction}>
          Track 7 nights to see your sleep quality score.
        </Text>

        {/* 7 Days Progress Circles */}
        <View style={styles.dotsRow}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <View key={day} style={styles.dotOuter}>
              <View style={styles.dotInner} />
            </View>
          ))}
        </View>
      </View>

      {/* Expanded Sleep Toolkit Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sleep Toolkit</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.toolkitScroll}
      >
        {toolkitItems.map((item) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.toolkitCard}
              onPress={() => handleToolkitPress(item.id)}
              activeOpacity={0.8}
            >
              <Icon size={20} color={item.color} />
              <Text style={styles.toolkitLabel}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Tonight's Plan Section */}
      <View style={styles.sectionHeaderBetween}>
        <Text style={styles.sectionTitle}>Tonight's Plan</Text>

        <TouchableOpacity style={styles.bedtimeToggle} activeOpacity={0.8}>
          <Bed size={14} color="#9CA3AF" />
          <Text style={styles.bedtimeToggleText}>Off</Text>
        </TouchableOpacity>
      </View>

      {/* Checklist Progress Bar */}
      <View style={styles.planProgressCard}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressText}>
            {completedTasks.length}/{checklistItems.length}
          </Text>
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(completedTasks.length / checklistItems.length) * 100}%` },
            ]}
          />
        </View>

        {/* Checklist Items */}
        <View style={styles.checklistGroup}>
          {checklistItems.map((item) => {
            const Icon = item.icon;
            const isDone = completedTasks.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.checkCard, isDone ? styles.checkCardDone : null]}
                onPress={() => toggleTask(item.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkIconBox, { backgroundColor: item.color + '20' }]}>
                  <Icon size={18} color={item.color} />
                </View>

                <Text style={[styles.checkTitle, isDone ? styles.checkTitleDone : null]}>
                  {item.title}
                </Text>

                {isDone ? (
                  <CheckCircle2 size={22} color="#3B82F6" fill="#3B82F6" />
                ) : (
                  <Circle size={22} color="#374151" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Dynamic Toolkit Feature Modal */}
      <Modal
        visible={activeModal !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setActiveModal(null)}>
              <X size={20} color="#94A3B8" />
            </TouchableOpacity>

            {activeModal === 'breathwork' && (
              <View style={styles.toolModalBody}>
                <Wind size={40} color="#C084FC" style={{ marginBottom: 12 }} />
                <Text style={styles.toolModalTitle}>4-7-8 Breathwork</Text>
                <Text style={styles.toolModalSub}>
                  Inhale for 4s, hold for 7s, exhale for 8s to calm your nervous system.
                </Text>

                <View style={styles.breathCircle}>
                  <Text style={styles.breathText}>4-7-8</Text>
                </View>
              </View>
            )}

            {activeModal === 'nap' && (
              <View style={styles.toolModalBody}>
                <Zap size={40} color="#FBBF24" style={{ marginBottom: 12 }} />
                <Text style={styles.toolModalTitle}>Power Nap Timer</Text>
                <Text style={styles.toolModalSub}>
                  Boost energy and alertness without sleep inertia.
                </Text>

                <View style={styles.napBtnRow}>
                  <TouchableOpacity style={styles.napOptionBtn} onPress={() => setActiveModal(null)}>
                    <Text style={styles.napOptionText}>20 Mins</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.napOptionBtn} onPress={() => setActiveModal(null)}>
                    <Text style={styles.napOptionText}>30 Mins</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {activeModal === 'stories' && (
              <View style={styles.toolModalBody}>
                <BookOpen size={40} color="#60A5FA" style={{ marginBottom: 12 }} />
                <Text style={styles.toolModalTitle}>Bedtime Sleep Stories</Text>
                <Text style={styles.toolModalSub}>
                  Soothing narrations to drift peacefully off to sleep.
                </Text>

                <TouchableOpacity style={styles.actionPillBtn} onPress={() => onNavigateTab('sounds')}>
                  <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                  <Text style={styles.actionPillText}>Listen to Stories</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeModal === 'dreambot' && (
              <View style={styles.toolModalBody}>
                <CloudMoon size={40} color="#38BDF8" style={{ marginBottom: 12 }} />
                <Text style={styles.toolModalTitle}>Plaxora Dreambot AI</Text>
                <Text style={styles.toolModalSub}>
                  Ask Dreambot AI for personalized sleep advice and relaxation tips.
                </Text>

                <TouchableOpacity style={styles.actionPillBtn} onPress={() => setActiveModal(null)}>
                  <Text style={styles.actionPillText}>Start AI Chat</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeModal === 'hygiene' && (
              <View style={styles.toolModalBody}>
                <BookMarked size={40} color="#A7F3D0" style={{ marginBottom: 12 }} />
                <Text style={styles.toolModalTitle}>Sleep Hygiene Guide</Text>
                <Text style={styles.toolModalSub}>
                  1. Keep bedroom at 18°C (65°F){'\n'}
                  2. Dim lights 1 hr before sleep{'\n'}
                  3. Avoid caffeine after 2:00 PM
                </Text>
              </View>
            )}

            {activeModal === 'journal' && (
              <View style={styles.toolModalBody}>
                <FileText size={40} color="#F472B6" style={{ marginBottom: 12 }} />
                <Text style={styles.toolModalTitle}>Dream Journal</Text>
                <Text style={styles.toolModalSub}>
                  Record your dreams upon waking to reflect and uncover sleep patterns.
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  gaugeSectionContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  svgWrapper: {
    width: 270,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  archContentOverlay: {
    position: 'absolute',
    top: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  archTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  archSub: {
    fontSize: 14,
    fontWeight: '400',
    color: '#94A3B8',
    marginBottom: 16,
  },
  trackBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  trackBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  gaugeInstruction: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 18,
    marginBottom: 14,
    textAlign: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  dotOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#334155',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bedtimeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  bedtimeToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  toolkitScroll: {
    gap: 10,
    paddingBottom: 6,
  },
  toolkitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  toolkitLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  planProgressCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  progressTextRow: {
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  checklistGroup: {
    gap: 10,
  },
  checkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0B0F19',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  checkCardDone: {
    borderColor: '#1D4ED8',
    backgroundColor: '#1E1B4B',
  },
  checkIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  checkTitleDone: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#111827',
    width: '100%',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  toolModalBody: {
    alignItems: 'center',
    paddingTop: 10,
  },
  toolModalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  toolModalSub: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  breathCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#C084FC',
  },
  breathText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C084FC',
  },
  napBtnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  napOptionBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  napOptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  actionPillText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
