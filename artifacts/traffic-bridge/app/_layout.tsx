import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/components/ErrorBoundary';
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
import { Image, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

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

  useEffect(() => {
    if (!fontsLoaded && !fontError) return;

    SplashScreen.hideAsync();
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const nextProgress = Math.min(
        100,
        Math.round(((Date.now() - startedAt) / 10000) * 100),
      );
      setBootProgress(nextProgress);
      if (nextProgress >= 100) {
        clearInterval(timer);
        setBootComplete(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;
  if (!bootComplete) return <StartupScreen progress={bootProgress} />;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <KeyboardProvider>
              <RootLayoutNav />
            </KeyboardProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

function StartupScreen({ progress }: { progress: number }) {
  const colors = useColors();
  const styles = startupStyles;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#05060a', '#091923', '#05060a']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <View style={styles.iconFrame}>
          <Image
            accessibilityLabel="آیکون Traffic Bridge"
            source={require('../assets/images/icon.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Traffic Bridge</Text>
        <Text style={styles.subtitle}>آماده‌سازی محیط اتصال</Text>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={['#52d6c4', '#45a7ff', '#d9ff46']}
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

const startupStyles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 34,
  },
  iconFrame: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.14)',
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
    color: '#f4fbff',
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
  },
  subtitle: {
    color: '#9ab0c0',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginTop: 8,
  },
  progressTrack: {
    backgroundColor: 'rgba(255,255,255,0.12)',
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
    color: '#d9ff46',
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
  },
  progressLabel: {
    color: '#8aa3b4',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
});
