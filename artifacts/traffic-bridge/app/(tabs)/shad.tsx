import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const SHAD_URL = 'https://web.shad.ir';

export default function ShadScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);

  const openShad = async () => {
    await Haptics.selectionAsync();
    try {
      await WebBrowser.openBrowserAsync(SHAD_URL);
    } catch {
      // The in-app browser reports its own network errors to the user.
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style={colors.background === '#07141f' ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 118 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>BRIDGE SESSION</Text>
          <Text style={styles.title}>ورود به شاد</Text>
          <Text style={styles.subtitle}>
            صفحهٔ رسمی شاد در یک پنجرهٔ مرورگر داخلی باز می‌شود؛ ورود شما در
            همین محیط انجام خواهد شد.
          </Text>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <View style={styles.browserIcon}>
            <Ionicons name="globe-outline" size={30} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>اتصال به web.shad.ir</Text>
          <Text style={styles.heroText}>
            این برنامه فقط صفحهٔ رسمی شاد را نمایش می‌دهد و اطلاعات ورود شما را
            دریافت، ذخیره یا به سرویس دیگری ارسال نمی‌کند.
          </Text>
          <Pressable
            accessibilityLabel="باز کردن وب شاد"
            accessibilityRole="button"
            onPress={openShad}
            testID="open-shad"
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          >
            <Feather name="globe" size={18} color={colors.primaryForeground} />
            <Text style={styles.primaryButtonText}>ورود به شاد</Text>
          </Pressable>
          <Text style={styles.urlLabel}>{SHAD_URL.replace('https://', '')}</Text>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>مراحل اتصال</Text>
          <Text style={styles.sectionMeta}>۳ گام</Text>
        </View>

        <View style={styles.stepsCard}>
          <Step
            colors={colors}
            number="۱"
            title="ورود در صفحه رسمی"
            description="حساب خود را فقط در دامنه‌ی رسمی شاد وارد کنید."
          />
          <Step
            colors={colors}
            number="۲"
            title="بازگشت به برنامه"
            description="پس از اتمام ورود، به Traffic Bridge برگردید."
          />
          <Step
            colors={colors}
            number="۳"
            title="آماده‌سازی مرحله بعد"
            description="اتصال واقعی پس از آماده شدن سرویس سرور فعال می‌شود."
          />
        </View>

        <View style={styles.securityNote}>
          <Feather name="lock" size={17} color={colors.accentForeground} />
          <Text style={styles.securityText}>
            برای امنیت، رمز عبور و نشست شاد در این مرحله داخل برنامه ذخیره
            نمی‌شود.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

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