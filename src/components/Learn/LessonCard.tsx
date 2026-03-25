import {
  Pressable,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  id: number;
  title: string;
  progress: number;
  locked?: boolean;
  onPress: () => void;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
};

export default function LessonCard({
  id,
  title,
  progress,
  locked,
  onPress,
}: Props) {
  return (
    <View>
      {/* КАРТОЧКА */}
      <Pressable
        onPress={() => {
          if (locked) return;
          onPress();
        }}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
          locked && styles.locked,
        ]}
      >
        {/* декоративный элемент */}
        <View style={styles.decoration} />

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.badge}>
            {locked ? '🔒' : `${progress}%`}
          </Text>
        </View>

        {/* PROGRESS */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.subtitle}>
            {locked
              ? 'Заблокировано'
              : progress === 100
              ? 'Завершено 🎉'
              : 'Продолжить обучение'}
          </Text>

          {!locked && (
            <View style={styles.arrow}>
              <Text style={{ color: '#fff' }}>→</Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glass,
    borderRadius: 26,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,

    minHeight: 120,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,

    position: 'relative',
    overflow: 'hidden',
  },

  pressed: {
    transform: [{ scale: 0.97 }],
  },

  locked: {
    opacity: 0.5,
  },

  decoration: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.primary,
    opacity: 0.12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  badge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  progressContainer: {
    height: 10,
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginTop: 14,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },

  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  arrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});