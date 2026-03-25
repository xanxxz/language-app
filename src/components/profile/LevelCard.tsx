import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const LevelCard = () => {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Уровень</Text>

      <Text style={styles.level}>Level 3</Text>

      <View style={styles.bar}>
        <View style={styles.fill} />
      </View>

      <Text style={styles.text}>65% до следующего уровня</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginBlockEnd: 26,
    paddingInline: 16,
  },
  title: {
    fontSize: 12,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  level: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  bar: {
    height: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  fill: {
    width: '65%',
    height: '100%',
    backgroundColor: colors.primary,
  },
  text: {
    marginTop: 6,
    fontSize: 11,
    color: colors.textPrimary,
  },
});