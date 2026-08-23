import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Award, Clock, Calendar, Trash2, ShieldCheck, Smile } from 'lucide-react-native';
import { useSleepStore } from '../store/useSleepStore';

export const AnalyticsDashboard: React.FC = () => {
  const sessions = useSleepStore((state) => state.sessions);
  const deleteSession = useSleepStore((state) => state.deleteSession);
  const getStats = useSleepStore((state) => state.getStats);

  const stats = getStats();

  const formatDuration = (mins: number) => {
    const hrs = Math.floor(mins / 60);
    const m = mins % 60;
    return `${hrs}h ${m}m`;
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
      return iso;
    }
  };

  const formatTime = (iso: string) => {
    try {
      const d = new Date(iso);
      let h = d.getHours();
      const m = d.getMinutes();
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${h}:${m < 10 ? '0' : ''}${m} ${ampm}`;
    } catch (e) {
      return '';
    }
  };

  return (
    <View style={styles.container}>
      {/* Overview Cards */}
      <View style={styles.metricsRow}>
        {/* Score Card */}
        <View style={styles.metricCard}>
          <View style={styles.iconCircle}>
            <Award size={20} color="#818CF8" />
          </View>
          <Text style={styles.metricValue}>{stats.averageScore}%</Text>
          <Text style={styles.metricLabel}>Avg Sleep Score</Text>
        </View>

        {/* Duration Card */}
        <View style={styles.metricCard}>
          <View style={styles.iconCircle}>
            <Clock size={20} color="#10B981" />
          </View>
          <Text style={styles.metricValue}>{formatDuration(stats.averageDurationMinutes)}</Text>
          <Text style={styles.metricLabel}>Avg Duration</Text>
        </View>

        {/* Sessions Card */}
        <View style={styles.metricCard}>
          <View style={styles.iconCircle}>
            <Calendar size={20} color="#F59E0B" />
          </View>
          <Text style={styles.metricValue}>{stats.totalSessions}</Text>
          <Text style={styles.metricLabel}>Logged Nights</Text>
        </View>
      </View>

      {/* History List Section */}
      <Text style={styles.sectionTitle}>Sleep History Logs</Text>

      {sessions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Smile size={32} color="#6B7280" />
          <Text style={styles.emptyText}>No sleep sessions logged yet.</Text>
          <Text style={styles.emptySub}>Start Sleep Mode at bedtime to log your first night!</Text>
        </View>
      ) : (
        <View style={styles.historyList}>
          {sessions.map((s) => (
            <View key={s.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View style={styles.dateGroup}>
                  <Text style={styles.historyDate}>{formatDate(s.bedtime)}</Text>
                  <Text style={styles.historyTimes}>
                    {formatTime(s.bedtime)} → {formatTime(s.wakeTime)}
                  </Text>
                </View>

                <View style={styles.scoreBadge}>
                  <ShieldCheck size={14} color="#10B981" />
                  <Text style={styles.scoreText}>{s.efficiencyScore}% Score</Text>
                </View>
              </View>

              <View style={styles.historyFooter}>
                <View style={styles.tagGroup}>
                  <View style={styles.durationTag}>
                    <Text style={styles.tagText}>{formatDuration(s.durationMinutes)}</Text>
                  </View>
                  {s.mood ? (
                    <View style={styles.moodTag}>
                      <Text style={styles.moodTagText}>{s.mood.toUpperCase()}</Text>
                    </View>
                  ) : null}
                </View>

                <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteSession(s.id)}>
                  <Trash2 size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F9FAFB',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9CA3AF',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  emptyCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F9FAFB',
    marginTop: 8,
  },
  emptySub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  historyList: {
    gap: 10,
  },
  historyCard: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateGroup: {
    gap: 2,
  },
  historyDate: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  historyTimes: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  historyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  tagGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  durationTag: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D1D5DB',
  },
  moodTag: {
    backgroundColor: 'rgba(129, 140, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  moodTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#818CF8',
  },
  deleteBtn: {
    padding: 4,
  },
});
