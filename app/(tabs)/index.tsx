import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useThemeMode } from '@/contexts/ThemeContext';

function formatBytes(value: number) {
  if (value === 0) return '۰ B';
  return `${Math.round(value / 1024)} KB`;
}

export default function ConnectionScreen() {
  const colors = useColors();
  const { mode } = useThemeMode();
  const insets = useSafeAreaInsets();
  const [connected, setConnected] = useState(false);
  const pulseScale = useRef(new Animated.Value(0.92)).current;
  const pulseOpacity = useRef(new Animated.Value(0.25)).current;
  const styles = createStyles(colors);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 1.08,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.04,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 0.92,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.25,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulseOpacity, pulseScale]);

  const toggleConnection = async () => {
    await Haptics.impactAsync(
      connected
        ? Haptics.ImpactFeedbackStyle.Light
        : Haptics.ImpactFeedbackStyle.Medium,
    );
    setConnected((current) => !current);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 118 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <Text style={styles.brandTitle} numberOfLines={1}>
            <Text style={{ color: colors.gradientStart }}>Hoosh</Text>
            <Text style={{ color: colors.gradientMid }}>Net</Text>
          </Text>
          <View style={styles.headerActions}>
            <ThemeToggle />
            <View style={styles.stageBadge}>
              <View style={styles.stageDot} />
              <Text style={styles.stageText}>مرکز اتصال</Text>
            </View>
          </View>
        </View>

        <LinearGradient
          colors={[colors.card, colors.secondary, colors.card]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.connectionCard}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.statusPill,
                connected ? styles.statusPillOn : styles.statusPillOff,
              ]}
            >
              <View
                style={[
                  styles.statusPillDot,
                  {
                    backgroundColor: connected
                      ? colors.primary
                      : colors.destructiveForeground,
                  },
                ]}
              />
              <Text
                style={[
                  styles.statusPillText,
                  {
                    color: connected
                      ? colors.accentForeground
                      : colors.destructiveForeground,
                  },
                ]}
              >
                {connected ? 'فعال' : 'آماده به کار'}
              </Text>
            </View>
          </View>

          <View style={styles.orbArea}>
            <Animated.View
              style={[
                styles.orbPulse,
                {
                  backgroundColor: connected
                    ? colors.primary
                    : colors.destructive,
                  opacity: pulseOpacity,
                  transform: [{ scale: pulseScale }],
                },
              ]}
            />
            <Pressable
              accessibilityLabel={connected ? 'قطع اتصال' : 'برقراری اتصال'}
              accessibilityRole="button"
              onPress={toggleConnection}
              testID="connection-toggle"
              style={({ pressed }) => [
                styles.orbButton,
                connected ? styles.orbButtonOn : styles.orbButtonOff,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="power"
                size={38}
                color={
                  connected ? colors.primaryForeground : colors.destructive
                }
              />
              <Text
                style={[
                  styles.orbLabel,
                  {
                    color: connected
                      ? colors.primaryForeground
                      : colors.destructive,
                  },
                ]}
              >
                 {connected ? 'فعال' : 'شروع'}
              </Text>
            </Pressable>
          </View>

          <LinearGradient
            colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.statusSummary}
          >
            <Text style={styles.statusSummaryText}>
              وضعیت اتصال : {connected ? 'اتصال برقرار است' : 'اتصال برقرار نیست'}
            </Text>
          </LinearGradient>
        </LinearGradient>

        <View
          style={[
            styles.sectionHeading,
            Platform.OS === 'android' && styles.androidSectionHeading,
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              Platform.OS === 'android' && styles.androidSectionTitle,
            ]}
          >
            میزان مصرف ترافیک :
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard
            colors={colors}
            icon="arrow-up-right"
            label="ارسال شده"
            value={formatBytes(0)}
            accent={colors.primary}
          />
          <StatCard
            colors={colors}
            icon="arrow-down-left"
            label="دریافت شده"
            value={formatBytes(0)}
            accent={colors.accentForeground}
          />
        </View>

        <View style={styles.noteCard}>
          <View style={styles.noteIcon}>
            <Feather name="shield" size={18} color={colors.primary} />
          </View>
          <View style={styles.noteCopy}>
             <Text style={styles.noteTitle}>حریم خصوصی و کنترل</Text>
            <Text style={styles.noteText}>
               اطلاعات ورود و نشست بدون اقدام مستقیم شما ذخیره نمی‌شود. برای
               آشنایی با پیش‌نیازهای راه‌اندازی، راهنمای اتصال سرور را ببینید.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({
  colors,
  icon,
  label,
  value,
  accent,
}: {
  colors: ReturnType<typeof useColors>;
  icon: 'arrow-up-right' | 'arrow-down-left';
  label: string;
  value: string;
  accent: string;
}) {
  const styles = createStyles(colors);
  return (
    <LinearGradient
      colors={[colors.card, colors.secondary, colors.card]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.statCard}
    >
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statIcon}
      >
        <Feather name={icon} size={18} color={accent} />
      </LinearGradient>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </LinearGradient>
  );
}

function createStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { paddingHorizontal: 20, gap: 18 },
    topRow: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerActions: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    brandTitle: {
      color: colors.foreground,
      fontFamily: 'Inter_700Bold',
      fontSize: 28,
      letterSpacing: 0.4,
    },
    stageBadge: {
      alignItems: 'center',
      backgroundColor: colors.accent,
      borderRadius: 20,
      flexDirection: 'row',
      gap: 7,
      paddingHorizontal: 11,
      paddingVertical: 8,
    },
    stageDot: {
      backgroundColor: colors.primary,
      borderRadius: 4,
      height: 8,
      width: 8,
    },
    stageText: {
      color: colors.accentForeground,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 11,
    },
    connectionCard: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderRadius: 28,
      borderWidth: 1,
      minHeight: 385,
      padding: 20,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      elevation: 5,
    },
    cardHeader: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'space-between',
    },
    statusSummary: {
      borderRadius: 15,
      flex: 1,
      justifyContent: 'center',
      minHeight: 42,
      paddingHorizontal: 13,
    },
    statusSummaryText: {
      color: colors.primaryForeground,
      fontFamily: 'Inter_700Bold',
      fontSize: 12,
      textAlign: 'right',
    },
    cardKicker: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      textAlign: 'right',
    },
    statusPill: {
      alignItems: 'center',
      borderRadius: 15,
      flexDirection: 'row',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    statusPillOn: { backgroundColor: colors.accent },
    statusPillOff: { backgroundColor: colors.destructive },
    statusPillDot: { borderRadius: 4, height: 8, width: 8 },
    statusPillText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 11,
    },
    orbArea: {
      alignItems: 'center',
      height: 235,
      justifyContent: 'center',
      marginTop: 4,
    },
    orbPulse: {
      borderRadius: 110,
      height: 220,
      position: 'absolute',
      width: 220,
    },
    orbButton: {
      alignItems: 'center',
      borderRadius: 92,
      height: 184,
      justifyContent: 'center',
      width: 184,
    },
    orbButtonOn: { backgroundColor: colors.primary },
    orbButtonOff: {
      backgroundColor: colors.card,
      borderColor: colors.destructive,
      borderWidth: 2,
    },
    orbLabel: {
      fontFamily: 'Inter_700Bold',
      fontSize: 15,
      marginTop: 9,
    },
    pressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },
    sectionHeading: {
      alignItems: 'baseline',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    sectionTitle: {
      color: colors.foreground,
      fontFamily: 'Inter_700Bold',
      fontSize: 18,
      textAlign: 'right',
    },
    statsRow: { flexDirection: 'row', gap: 10 },
    statCard: {
      borderColor: colors.border,
      borderRadius: 18,
      borderWidth: 1,
      flex: 1,
      minHeight: 112,
      padding: 12,
    },
    statIcon: {
      alignItems: 'center',
      borderRadius: 10,
      height: 34,
      justifyContent: 'center',
      width: 34,
    },
    statLabel: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      marginTop: 10,
      textAlign: 'right',
    },
    statValue: {
      color: colors.foreground,
      fontFamily: 'Inter_700Bold',
      fontSize: 22,
      marginTop: 3,
      textAlign: 'right',
    },
    noteCard: {
      alignItems: 'flex-start',
      backgroundColor: colors.secondary,
      borderRadius: 20,
      flexDirection: 'row',
      gap: 12,
      padding: 16,
    },
    noteIcon: {
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      height: 38,
      justifyContent: 'center',
      width: 38,
    },
    noteCopy: { flex: 1 },
    noteTitle: {
      color: colors.secondaryForeground,
      fontFamily: 'Inter_700Bold',
      fontSize: 13,
      textAlign: 'right',
    },
    noteText: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 19,
      marginTop: 4,
      textAlign: 'right',
    },
  });
}
