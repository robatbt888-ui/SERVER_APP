import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const steps = [
  {
    number: '۱',
    title: 'ورود به پنل VPS',
    description:
      'به پنل ارائه‌دهندهٔ سرور مجازی خود وارد شوید و یک سرور مورداعتماد را انتخاب کنید.',
    icon: 'server',
  },
  {
    number: '۲',
    title: 'ورود به حساب GitHub',
    description:
      'با حساب GitHub خود وارد شوید. اطلاعات ورود را فقط در صفحهٔ رسمی GitHub وارد کنید.',
    icon: 'github',
  },
  {
    number: '۳',
    title: 'بارگذاری فایل پروژه',
    description:
      'فایل تنظیمات شبکه را در مخزن Repository مربوط به پروژه بارگذاری یا به‌روزرسانی کنید.',
    icon: 'upload-cloud',
  },
  {
    number: '۴',
    title: 'ورود به سرور',
    description:
      'به سرور مجازی متصل شوید و آماده‌سازی سرویس‌های موردنیاز را در مسیر تعیین‌شده انجام دهید.',
    icon: 'terminal',
  },
  {
    number: '۵',
    title: 'بارگذاری فایل مخصوص سرور',
    description:
      'فایل مخصوص سرور را در مسیر مربوطه قرار دهید. نام و محتوای نهایی این فایل در مرحلهٔ بعد مشخص می‌شود.',
    icon: 'file-text',
  },
  {
    number: '۶',
    title: 'ورود به حساب شاد',
    description:
      'در بخش شاد برنامه به همان حساب کاربری معرفی‌شده وارد شوید تا پل ارتباطی آماده شود.',
    icon: 'log-in',
  },
  {
    number: '۷',
    title: 'بارگذاری فایل کمکی',
    description:
      'فایل کمکی JSON را در بخش پیام‌های ذخیره‌شده قرار دهید و تنظیمات نهایی اتصال را تکمیل کنید.',
    icon: 'file-plus',
  },
];

export default function GuideScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);

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
          <Text style={styles.eyebrow}>SECURE SETUP</Text>
          <Text style={styles.title}>راهنمای اتصال سرور</Text>
          <Text style={styles.subtitle}>
            مراحل راه‌اندازی را به‌ترتیب انجام دهید. کنترل حساب‌ها، سرور و
            اطلاعات اتصال در اختیار خود شماست.
          </Text>
        </View>

        <View style={styles.privacyCard}>
          <View style={styles.privacyIcon}>
            <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
          </View>
          <View style={styles.privacyCopy}>
            <Text style={styles.privacyTitle}>حریم خصوصی در اختیار شماست</Text>
            <Text style={styles.privacyText}>
              اطلاعات حساب و فایل‌های اتصال نزد شما می‌ماند. ما به حساب شاد،
              GitHub یا سرور شما دسترسی نداریم و سرور نیز توسط خود شما مدیریت
              می‌شود.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>مراحل راه‌اندازی</Text>
          <Text style={styles.sectionMeta}>۷ مرحله</Text>
        </View>

        <View style={styles.stepsCard}>
          {steps.map((step, index) => (
            <GuideStep
              key={step.number}
              colors={colors}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon as keyof typeof Feather.glyphMap}
              last={index === steps.length - 1}
            />
          ))}
        </View>

        <View style={styles.placeholderCard}>
          <View style={styles.placeholderHeader}>
            <Feather name="clock" size={18} color={colors.destructive} />
            <Text style={styles.placeholderTitle}>موارد در حال تکمیل</Text>
          </View>
          <Text style={styles.placeholderText}>
            فایل مخصوص سرور و فایل کمکی JSON هنوز طراحی نشده‌اند. در این مرحله
            فقط جای‌گذار آن‌ها در نظر گرفته شده است و تا زمان تکمیل، اطلاعات
            حساس یا فایل ناشناس را در سرور یا حساب شاد بارگذاری نکنید.
          </Text>
          <View style={styles.fileRow}>
            <Feather name="file" size={16} color={colors.mutedForeground} />
            <Text style={styles.fileLabel}>[فایل تنظیمات سرور]</Text>
          </View>
          <View style={styles.fileRow}>
            <Feather name="file-text" size={16} color={colors.mutedForeground} />
            <Text style={styles.fileLabel}>[helper.json]</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function GuideStep({
  colors,
  number,
  title,
  description,
  icon,
  last,
}: {
  colors: ReturnType<typeof useColors>;
  number: string;
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  last: boolean;
}) {
  const styles = createStyles(colors);
  return (
    <View style={[styles.step, last && styles.lastStep]}>
      <View style={styles.stepRail}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{number}</Text>
        </View>
        {!last && <View style={styles.railLine} />}
      </View>
      <View style={styles.stepCopy}>
        <View style={styles.stepTitleRow}>
          <Feather name={icon} size={16} color={colors.primary} />
          <Text style={styles.stepTitle}>{title}</Text>
        </View>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    screen: { backgroundColor: colors.background, flex: 1 },
    content: { gap: 18, paddingHorizontal: 20 },
    header: { gap: 8 },
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
      fontSize: 29,
      textAlign: 'right',
    },
    subtitle: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      lineHeight: 24,
      textAlign: 'right',
    },
    privacyCard: {
      alignItems: 'flex-start',
      backgroundColor: colors.accent,
      borderColor: colors.primary,
      borderRadius: 22,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 12,
      padding: 16,
    },
    privacyIcon: {
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 14,
      height: 44,
      justifyContent: 'center',
      width: 44,
    },
    privacyCopy: { flex: 1 },
    privacyTitle: {
      color: colors.accentForeground,
      fontFamily: 'Inter_700Bold',
      fontSize: 14,
      textAlign: 'right',
    },
    privacyText: {
      color: colors.accentForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 20,
      marginTop: 5,
      textAlign: 'right',
    },
    sectionHeading: {
      alignItems: 'baseline',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 2,
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
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    step: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      gap: 12,
      minHeight: 86,
    },
    lastStep: { minHeight: 74 },
    stepRail: { alignItems: 'center', width: 32 },
    stepNumber: {
      alignItems: 'center',
      backgroundColor: colors.accent,
      borderColor: colors.primary,
      borderRadius: 16,
      borderWidth: 1,
      height: 32,
      justifyContent: 'center',
      width: 32,
    },
    stepNumberText: {
      color: colors.accentForeground,
      fontFamily: 'Inter_700Bold',
      fontSize: 13,
    },
    railLine: {
      backgroundColor: colors.border,
      flex: 1,
      marginVertical: 4,
      width: 1,
    },
    stepCopy: { flex: 1, paddingBottom: 16, paddingTop: 5 },
    stepTitleRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 7,
      justifyContent: 'flex-end',
    },
    stepTitle: {
      color: colors.cardForeground,
      flex: 1,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 13,
      textAlign: 'right',
    },
    stepDescription: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 19,
      marginTop: 4,
      textAlign: 'right',
    },
    placeholderCard: {
      backgroundColor: colors.card,
      borderColor: colors.destructive,
      borderRadius: 20,
      borderWidth: 1,
      padding: 16,
    },
    placeholderHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'flex-end',
    },
    placeholderTitle: {
      color: colors.cardForeground,
      fontFamily: 'Inter_700Bold',
      fontSize: 14,
    },
    placeholderText: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 20,
      marginTop: 8,
      textAlign: 'right',
    },
    fileRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'flex-end',
      marginTop: 10,
    },
    fileLabel: {
      color: colors.mutedForeground,
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
    },
  });
}