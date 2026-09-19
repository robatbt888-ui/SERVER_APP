import { Feather, Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useThemeMode } from '@/contexts/ThemeContext';
import { useColors } from '@/hooks/useColors';

const SHAD_URL = 'https://web.shad.ir';

export default function ShadScreen() {
  const colors = useColors();
  const { mode } = useThemeMode();
  const insets = useSafeAreaInsets();
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);

  if (Platform.OS === 'web') {
    return (
      <View style={[webStyles.webScreen, { backgroundColor: colors.background }]}>
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
        <View style={[webStyles.webFallback, { paddingTop: insets.top + 32 }]}>
          <Ionicons name="globe-outline" size={42} color={colors.primary} />
          <Text style={[webStyles.fallbackTitle, { color: colors.foreground }]}>
            شاد در نسخه‌ی اندروید مستقیماً داخل برنامه باز می‌شود
          </Text>
          <Text style={[webStyles.fallbackText, { color: colors.mutedForeground }]}>
            پیش‌نمایش مرورگری از WebView بومی اندروید پشتیبانی نمی‌کند.
          </Text>
          <Pressable
            onPress={() => WebBrowser.openBrowserAsync(SHAD_URL)}
            style={[webStyles.fallbackButton, { backgroundColor: colors.primary }]}
          >
            <Text style={{ color: colors.primaryForeground, fontFamily: 'Inter_700Bold' }}>
              باز کردن پیش‌نمایش
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[webStyles.webScreen, { backgroundColor: colors.background }]}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <View
        style={[
          webStyles.browserBar,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
            paddingTop: insets.top + 8,
          },
        ]}
      >
        <ThemeToggle />
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={webStyles.addressBar}
        >
          <Feather name="lock" size={13} color={colors.primaryForeground} />
          <Text style={[webStyles.addressText, { color: colors.primaryForeground }]}>
            web.shad.ir
          </Text>
        </LinearGradient>
        <Pressable
          accessibilityLabel="بارگذاری دوباره صفحه شاد"
          accessibilityRole="button"
          onPress={() => webViewRef.current?.reload()}
          style={[webStyles.reloadButton, { backgroundColor: colors.muted }]}
        >
          <Feather name="refresh-cw" size={17} color={colors.foreground} />
        </Pressable>
      </View>
      <View style={webStyles.webContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: SHAD_URL }}
          style={webStyles.webView}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          startInLoadingState
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          setSupportMultipleWindows={false}
          javaScriptEnabled
          domStorageEnabled
        />
        {loading && (
          <View style={[webStyles.loadingOverlay, { backgroundColor: colors.background }]}>
            <ActivityIndicator color={colors.primary} size="large" />
            <Text style={[webStyles.loadingText, { color: colors.mutedForeground }]}>
              در حال بارگذاری شاد
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const webStyles = StyleSheet.create({
  webScreen: { flex: 1 },
  browserBar: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 8,
    paddingHorizontal: 14,
  },
  addressBar: {
    alignItems: 'center',
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
    minHeight: 38,
    paddingHorizontal: 14,
  },
  addressText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
  reloadButton: {
    alignItems: 'center',
    borderRadius: 14,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  webContainer: { flex: 1, position: 'relative' },
  webView: { flex: 1 },
  loadingOverlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  loadingText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    marginTop: 12,
  },
  webFallback: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 28,
  },
  fallbackTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 20,
    textAlign: 'center',
  },
  fallbackText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  fallbackButton: {
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 24,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

function Step({
  colors,
  number,
  title,
  description,
}: {
  colors: ReturnType<typeof useColors>;
  number: string;
  title: string;
  description: string;
}) {
  const styles = createStyles(colors);
  return (
    <View style={styles.step}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <View style={styles.stepCopy}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    screen: { backgroundColor: colors.background, flex: 1 },
    content: { gap: 18, paddingHorizontal: 20 },
    header: { gap: 7 },
    eyebrow: {
      color: colors.primary,
      fontFamily: 'Inter_700Bold',
      fontSize: 11,
      letterSpacing: 2,
      textAlign: 'right',
    },
    title: {
      color: colors.foreground,
      fontFamily: 'Inter_700Bold',
      fontSize: 30,
      textAlign: 'right',
    },
    subtitle: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      lineHeight: 24,
      textAlign: 'right',
    },
    heroCard: {
      alignItems: 'center',
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderRadius: 28,
      borderWidth: 1,
      overflow: 'hidden',
      padding: 24,
      position: 'relative',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      elevation: 5,
    },
    heroGlow: {
      backgroundColor: colors.accent,
      borderRadius: 150,
      height: 190,
      opacity: 0.7,
      position: 'absolute',
      right: -70,
      top: -75,
      width: 190,
    },
    browserIcon: {
      alignItems: 'center',
      backgroundColor: colors.accent,
      borderRadius: 22,
      height: 64,
      justifyContent: 'center',
      width: 64,
    },
    heroTitle: {
      color: colors.cardForeground,
      fontFamily: 'Inter_700Bold',
      fontSize: 19,
      marginTop: 18,
      textAlign: 'center',
    },
    heroText: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      lineHeight: 22,
      marginTop: 8,
      textAlign: 'center',
    },
    primaryButton: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 15,
      flexDirection: 'row',
      gap: 9,
      justifyContent: 'center',
      marginTop: 22,
      minHeight: 52,
      paddingHorizontal: 22,
      width: '100%',
    },
    primaryButtonText: {
      color: colors.primaryForeground,
      fontFamily: 'Inter_700Bold',
      fontSize: 14,
    },
    urlLabel: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_500Medium',
      fontSize: 11,
      letterSpacing: 0.5,
      marginTop: 12,
    },
    pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
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
    sectionMeta: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
    },
    stepsCard: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderRadius: 22,
      borderWidth: 1,
      padding: 16,
    },
    step: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      gap: 12,
      paddingVertical: 10,
    },
    stepNumber: {
      alignItems: 'center',
      backgroundColor: colors.accent,
      borderRadius: 15,
      height: 30,
      justifyContent: 'center',
      width: 30,
    },
    stepNumberText: {
      color: colors.accentForeground,
      fontFamily: 'Inter_700Bold',
      fontSize: 13,
    },
    stepCopy: { flex: 1 },
    stepTitle: {
      color: colors.cardForeground,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 13,
      textAlign: 'right',
    },
    stepDescription: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 19,
      marginTop: 3,
      textAlign: 'right',
    },
    securityNote: {
      alignItems: 'flex-start',
      backgroundColor: colors.accent,
      borderRadius: 18,
      flexDirection: 'row',
      gap: 10,
      padding: 15,
    },
    securityText: {
      color: colors.accentForeground,
      flex: 1,
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      lineHeight: 19,
      textAlign: 'right',
    },
  });
}