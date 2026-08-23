import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { ChevronRight, Users, Star, Award } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface Props {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<Props> = ({ onComplete }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/onboarding_bg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topBar} />

          {/* Main Hero Header */}
          <View style={styles.headerSection}>
            <Text style={styles.heroTitle}>Let's begin your journey</Text>
            <Text style={styles.heroSubTitle}>for a better sleep</Text>
          </View>

          {/* Stats Wreath Badges Group */}
          <View style={styles.badgesSection}>
            {/* Badge 1: +5 Million Users */}
            <View style={styles.badgeCard}>
              <View style={styles.laurelWingLeft}>
                <Text style={styles.laurelText}>🌿</Text>
              </View>
              <View style={styles.badgeContent}>
                <View style={styles.badgeHeaderRow}>
                  <Users size={16} color="#FBBF24" />
                </View>
                <Text style={styles.badgeValue}>+5 Million</Text>
                <Text style={styles.badgeLabel}>Users</Text>
              </View>
              <View style={styles.laurelWingRight}>
                <Text style={styles.laurelTextRight}>🌿</Text>
              </View>
            </View>

            {/* Badge 2: 4.8 Play Store Rating */}
            <View style={styles.badgeCard}>
              <View style={styles.laurelWingLeft}>
                <Text style={styles.laurelText}>🌿</Text>
              </View>
              <View style={styles.badgeContent}>
                <View style={styles.badgeHeaderRow}>
                  <Star size={14} color="#FBBF24" fill="#FBBF24" />
                  <Star size={14} color="#FBBF24" fill="#FBBF24" />
                  <Star size={14} color="#FBBF24" fill="#FBBF24" />
                </View>
                <Text style={styles.badgeValue}>▶ 4.8</Text>
                <Text style={styles.badgeLabel}>Play Store Rating</Text>
              </View>
              <View style={styles.laurelWingRight}>
                <Text style={styles.laurelTextRight}>🌿</Text>
              </View>
            </View>

            {/* Badge 3: #1 Sleep Tracker App */}
            <View style={styles.badgeCard}>
              <View style={styles.laurelWingLeft}>
                <Text style={styles.laurelText}>🌿</Text>
              </View>
              <View style={styles.badgeContent}>
                <Text style={styles.badgeValue}>#1</Text>
                <Text style={styles.badgeLabel}>Sleep Tracker App</Text>
              </View>
              <View style={styles.laurelWingRight}>
                <Text style={styles.laurelTextRight}>🌿</Text>
              </View>
            </View>
          </View>

          {/* Bottom Action Blue Floating Button */}
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.nextBtn} onPress={onComplete} activeOpacity={0.85}>
              <ChevronRight size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  topBar: {
    alignItems: 'flex-end',
    paddingTop: 12,
  },
  loginText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3B82F6',
    letterSpacing: 0.4,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  heroSubTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.4,
    marginTop: 4,
  },
  badgesSection: {
    alignItems: 'center',
    gap: 22,
    marginVertical: 10,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  laurelWingLeft: {
    transform: [{ scaleX: -1 }],
    marginRight: 8,
  },
  laurelWingRight: {
    marginLeft: 8,
  },
  laurelText: {
    fontSize: 28,
    opacity: 0.8,
  },
  laurelTextRight: {
    fontSize: 28,
    opacity: 0.8,
  },
  badgeContent: {
    alignItems: 'center',
    minWidth: 140,
  },
  badgeHeaderRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 2,
  },
  badgeValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FBBF24',
    letterSpacing: 0.5,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FCD34D',
    marginTop: 1,
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nextBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
