import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
};

export default function ContinueLessonCard({ title, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>Продолжить урок</Text>
      <Text style={styles.lesson}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6C5CE7',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },

  title: {
    color: '#fff',
    fontWeight: '600',
  },

  lesson: {
    marginTop: 6,
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});