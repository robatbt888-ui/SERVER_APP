import React, { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useColors } from '@/hooks/useColors';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
const STARTUP_DURATION_MS = 10_000;

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: 'بازگشت' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [bootProgress, setBootProgress] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const startupStartedAt = useRef<number | null>(null);

  useEffect(() => {
    startupStartedAt.current = Date.now();
    const timer = setInterval(() => {
      const startedAt = startupStartedAt.current ?? Date.now();
      const nextProgress = Math.min(
        100,
        Math.round(
          ((Date.now() - startedAt) / STARTUP_DURATION_MS) * 100,
        ),
      );
      setBootProgress(nextProgress);
      if (nextProgress >= 100) {
        clearInterval(timer);
        setBootComplete(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // The native splash must disappear immediately so the branded 0–100% screen
    // is the only startup view the user sees.
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
              <KeyboardProvider>
                {!bootComplete || (!fontsLoaded && !fontError) ? (
                  <StartupScreen progress={bootComplete ? 100 : bootProgress} />
                ) : (
                  <RootLayoutNav />
                )}
              </KeyboardProvider>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function StartupScreen({ progress }: { progress: number }) {
  const colors = useColors();
  const styles = createStartupStyles(colors);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <StatusBar style={colors.mode === 'dark' ? 'light' : 'dark'} />
      <LinearGradient
        colors={[colors.background, colors.card, colors.background]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <View style={styles.iconFrame}>
          <Image
             accessibilityLabel="آیکون HooshNet"
            source={require('../assets/images/icon.png')}
            style={styles.icon}
          />
        </View>
        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          numberOfLines={1}
          style={styles.title}
        >
          <Text style={{ color: colors.gradientStart }}>Hoosh</Text>
          <Text style={{ color: colors.gradientMid }}>Net</Text>
        </Text>
        <Text
          style={[
            styles.subtitle,
            Platform.OS === 'android' && styles.androidSubtitle,
          ]}
        >
          آماده‌سازی محیط اتصال
        </Text>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
        <View style={styles.progressMeta}>
          <Text style={styles.progressText}>{progress}٪</Text>
          <Text style={styles.progressLabel}>در حال آماده‌سازی</Text>
        </View>
      </View>
    </View>
  );
}

function createStartupStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    screen: { flex: 1 },
    content: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 34,
    },
    iconFrame: {
      alignItems: 'center',
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderRadius: 38,
      borderWidth: 1,
      height: 190,
      justifyContent: 'center',
      marginBottom: 26,
      overflow: 'hidden',
      width: 190,
    },
    icon: { height: 190, width: 190 },
    title: {
      color: colors.foreground,
      fontFamily: 'Inter_700Bold',
      fontSize: 28,
    },
    subtitle: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      marginTop: 8,
    },
    androidSubtitle: {
      textAlign: 'center',
      writingDirection: 'rtl',
      width: '100%',
    },
    progressTrack: {
      backgroundColor: colors.muted,
      borderRadius: 6,
      height: 8,
      marginTop: 46,
      overflow: 'hidden',
      width: '100%',
    },
    progressFill: { borderRadius: 6, height: 8 },
    progressMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      width: '100%',
    },
    progressText: {
      color: colors.primary,
      fontFamily: 'Inter_700Bold',
      fontSize: 13,
    },
    progressLabel: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
    },
  });
}
