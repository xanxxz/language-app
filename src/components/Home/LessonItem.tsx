import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  title: string;
  progress: number;
  locked?: boolean;
  onPress?: () => void;
};

export default function LessonItem({
  title,
  progress,
  locked,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[styles.card, locked && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={locked}
    >
      <Text style={styles.title}>{title}</Text>

      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.progress}>{progress}%</Text>

      {locked && <Text style={styles.locked}>🔒 Заблокировано</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  title: {
    fontWeight: '600',
  },
  bar: {
    height: 6,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 6,
    marginTop: 8,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progress: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  locked: {
    marginTop: 6,
    color: colors.textSecondary,
  },
});