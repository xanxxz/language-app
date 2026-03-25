import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
];

type Props = {
  current: string;
  onChange: (code: string) => void;
};

export const LanguageCard = ({ current, onChange }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>🌍 Язык</Text>

      <View style={styles.row}>
        {languages.map((lang) => {
          const active = current === lang.code;

          return (
            <Pressable
              key={lang.code}
              style={[styles.btn, active && styles.active]}
              onPress={() => onChange(lang.code)}
            >
              <Text style={{ color: active ? '#fff' : colors.textPrimary }}>
                {lang.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glass,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  active: {
    backgroundColor: colors.primary,
  },
});