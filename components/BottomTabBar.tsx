import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Music, Moon, BarChart2, User } from 'lucide-react-native';

interface Props {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onStartSleep: () => void;
}

export const BottomTabBar: React.FC<Props> = ({ activeTab, onSelectTab, onStartSleep }) => {
  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onSelectTab('home')}
        activeOpacity={0.8}
      >
        <Home size={22} color={activeTab === 'home' ? '#FFFFFF' : '#64748B'} />
        <Text style={[styles.tabLabel, activeTab === 'home' ? styles.tabLabelActive : null]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Sounds Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onSelectTab('sounds')}
        activeOpacity={0.8}
      >
        <Music size={22} color={activeTab === 'sounds' ? '#FFFFFF' : '#64748B'} />
        <Text style={[styles.tabLabel, activeTab === 'sounds' ? styles.tabLabelActive : null]}>
          Sounds
        </Text>
      </TouchableOpacity>

      {/* Ultra-Premium Floating Start Sleep Pill Button */}
      <View style={styles.floatingWrapper}>
        {/* Outer Translucent Glow Ring */}
        <View style={styles.outerGlowRing} />

        <TouchableOpacity
          style={styles.floatingCenterBtn}
          onPress={onStartSleep}
          activeOpacity={0.85}
        >
          <View style={styles.centerIconGroup}>
            <Moon size={22} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.centerBtnText}>Start Sleep</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Statistics Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onSelectTab('analytics')}
        activeOpacity={0.8}
      >
        <BarChart2 size={22} color={activeTab === 'analytics' ? '#FFFFFF' : '#64748B'} />
        <Text style={[styles.tabLabel, activeTab === 'analytics' ? styles.tabLabelActive : null]}>
          Statistics
        </Text>
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onSelectTab('profile')}
        activeOpacity={0.8}
      >
        <User size={22} color={activeTab === 'profile' ? '#FFFFFF' : '#64748B'} />
        <Text style={[styles.tabLabel, activeTab === 'profile' ? styles.tabLabelActive : null]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#0B0F19',
    height: 76,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  floatingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
    position: 'relative',
  },
  outerGlowRing: {
    position: 'absolute',
    width: 74,
    height: 74,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 122, 255, 0.25)',
  },
  floatingCenterBtn: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 10,
  },
  centerIconGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtnText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 3,
    letterSpacing: 0.3,
  },
});
