import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './components/HomeScreen';
import { SoundsScreen } from './components/SoundsScreen';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ProfileScreen } from './components/ProfileScreen';
import { SleepTimerModal } from './components/SleepTimerModal';
import { OnboardingScreen } from './components/OnboardingScreen';
import { StartSleepModal } from './components/StartSleepModal';
import { ActiveTrackingScreen } from './components/ActiveTrackingScreen';
import { BottomTabBar } from './components/BottomTabBar';
import { useSleepStore } from './store/useSleepStore';

export default function App() {
  const init = useSleepStore((state) => state.init);
  const startNightSession = useSleepStore((state) => state.startNightSession);

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showStartSleepModal, setShowStartSleepModal] = useState(false);
  const [showActiveTracking, setShowActiveTracking] = useState(false);
  const [activeAlarmTime, setActiveAlarmTime] = useState<string | null>(null);

  useEffect(() => {
    init();
  }, []);

  const handleStartSleepClick = () => {
    setShowStartSleepModal(true);
  };

  const handleStartSleepSession = (alarmTime: string | null, isSmart: boolean) => {
    setShowStartSleepModal(false);
    setActiveAlarmTime(alarmTime);
    startNightSession();
    setShowActiveTracking(true);
  };

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Main Tab Screen Content */}
      <View style={styles.contentArea}>
        {activeTab === 'home' ? (
          <HomeScreen
            onNavigateTab={(tab) => setActiveTab(tab)}
            onStartSleep={handleStartSleepClick}
          />
        ) : null}

        {activeTab === 'sounds' ? (
          <View style={styles.scrollPage}>
            <SoundsScreen />
          </View>
        ) : null}

        {activeTab === 'analytics' ? (
          <View style={styles.scrollPage}>
            <AnalyticsDashboard />
          </View>
        ) : null}

        {activeTab === 'profile' ? (
          <ProfileScreen onResetOnboarding={() => setHasCompletedOnboarding(false)} />
        ) : null}
      </View>

      {/* Bottom Floating Navigation Bar */}
      <BottomTabBar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onStartSleep={handleStartSleepClick}
      />

      {/* Sleep Timer Modal */}
      <SleepTimerModal visible={showTimerModal} onClose={() => setShowTimerModal(false)} />

      {/* Start Sleep Alarm Modal */}
      <StartSleepModal
        visible={showStartSleepModal}
        onClose={() => setShowStartSleepModal(false)}
        onStartSleepSession={handleStartSleepSession}
      />

      {/* Active Night Sleep Tracking Full Screen */}
      <ActiveTrackingScreen
        visible={showActiveTracking}
        alarmTime={activeAlarmTime}
        onClose={() => setShowActiveTracking(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  contentArea: {
    flex: 1,
    paddingBottom: 72,
  },
  scrollPage: {
    flex: 1,
  },
});
