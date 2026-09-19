import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useThemeMode } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const colors = useColors();
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Pressable
      accessibilityLabel={mode === 'dark' ? 'فعال کردن حالت روشن' : 'فعال کردن حالت تاریک'}
      accessibilityRole="button"
      onPress={toggleTheme}
      testID="theme-toggle"
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <Feather
        name={mode === 'dark' ? 'sun' : 'moon'}
        size={18}
        color={mode === 'dark' ? colors.gradientEnd : colors.gradientMid}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.94 }],
  },
});