import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  xp: number;
  streak: number;
};

export default function StatsCard({ xp, streak }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.number}>🔥 {streak}</Text>
        <Text style={styles.text}>дней подряд</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>⭐ {xp}</Text>
        <Text style={styles.text}>XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 14,
    marginRight: 8,
  },
  number: {
    fontWeight: '600',
  },
  text: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});