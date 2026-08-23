import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Settings,
  Moon,
  Bed,
  Gauge,
  Heart,
  Smile,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';
import { useSleepStore } from '../store/useSleepStore';

interface Props {
  onResetOnboarding: () => void;
}

export const ProfileScreen: React.FC<Props> = ({ onResetOnboarding }) => {
  const sessions = useSleepStore((state) => state.sessions);
  const getStats = useSleepStore((state) => state.getStats);

  const stats = getStats();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formatHours = (mins: number) => {
    const hrs = Math.floor(mins / 60);
    return `${hrs}h`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header Row (NO PRO Badge anywhere) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>

        <TouchableOpacity style={styles.settingsIconBtn} activeOpacity={0.8}>
          <Settings size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Top 3-Column Stats Row */}
      <View style={styles.statsRow}>
        {/* Tracked Nights */}
        <View style={styles.statCol}>
          <Moon size={20} color="#38BDF8" />
          <Text style={styles.statLabel}>Tracked{'\n'}Nights</Text>
          <Text style={styles.statValue}>{stats.totalSessions}</Text>
        </View>

        {/* Avg. Sleep Time */}
        <View style={styles.statCol}>
          <Bed size={20} color="#38BDF8" />
          <Text style={styles.statLabel}>Avg.{'\n'}Sleep Time</Text>
          <Text style={styles.statValue}>{formatHours(stats.averageDurationMinutes)}</Text>
        </View>

        {/* Avg. Sleep Score */}
        <View style={styles.statCol}>
          <Gauge size={20} color="#38BDF8" />
          <Text style={styles.statLabel}>Avg.{'\n'}Sleep Score</Text>
          <Text style={styles.statValue}>%{stats.averageScore}</Text>
        </View>
      </View>

      {/* Account Log In / Sign Up Banner */}
      <View style={styles.accountCard}>
        <Text style={styles.accountCardText}>
          Create or access your account to keep your sleep data safe, synced, and personal.
        </Text>

        <View style={styles.accountBtnRow}>
          <TouchableOpacity style={styles.loginBtn} activeOpacity={0.8}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupBtn} activeOpacity={0.8}>
            <Text style={styles.signupBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Heart Rate Measurement Card */}
      <View style={styles.heartCard}>
        <View style={styles.heartCardHeader}>
          <Heart size={18} color="#EF4444" fill="#EF4444" />
          <Text style={styles.heartCardTitle}>Heart Rate</Text>
        </View>

        <View style={styles.heartIconCircle}>
          <Heart size={36} color="#334155" />
        </View>

        <Text style={styles.noDataTitle}>No Data Collected</Text>
        <Text style={styles.noDataSub}>No heart rate data has been collected yet.</Text>

        <TouchableOpacity style={styles.measureBtn} activeOpacity={0.85}>
          <Text style={styles.measureBtnText}>Measure Heart Rate</Text>
        </TouchableOpacity>
      </View>

      {/* Reset Welcome Screen Link */}
      <TouchableOpacity style={styles.resetBtn} onPress={onResetOnboarding} activeOpacity={0.8}>
        <LogOut size={16} color="#64748B" />
        <Text style={styles.resetBtnText}>View Welcome Onboarding Screen</Text>
      </TouchableOpacity>

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
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  settingsIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 4,
    lineHeight: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  accountCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 20,
  },
  accountCardText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  accountBtnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  loginBtn: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  loginBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  signupBtn: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  signupBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heartCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
    alignItems: 'center',
    marginBottom: 24,
  },
  heartCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  heartCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heartIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  noDataTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  noDataSub: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 20,
    textAlign: 'center',
  },
  measureBtn: {
    backgroundColor: '#007AFF',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  measureBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
});
