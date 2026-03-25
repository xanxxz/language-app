import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  onRepeat?: () => void;
  onQuiz?: () => void;
};

export default function QuickActions({ onRepeat, onQuiz }: Props) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.btn} onPress={onRepeat}>
        <Text>🔁 Повторить</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={onQuiz}>
        <Text>🧠 Тест</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 8,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});