import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const StatsCard = () => {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>🔥 120</Text>
        <Text style={styles.statLabel}>XP</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statValue}>📅 5</Text>
        <Text style={styles.statLabel}>Дней подряд</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statValue}>🎯 8</Text>
        <Text style={styles.statLabel}>Уроков</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textPrimary,
  },
});