import { Pressable, View, Text, StyleSheet } from 'react-native';

type Props = {
  progress: number;
  title: string;
  onPress: () => void;
};

export default function ProgressCard({
  progress,
  title,
  onPress,
}: Props) {
  return (
    <View style={styles.card}>
      {/* HEADER */}
      <Text style={styles.title}>📚 Прогресс обучения</Text>

      {/* PROGRESS */}
      <View style={styles.progressWrapper}>
        <View style={styles.bar}>
          <View
            style={[
              styles.fill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        <Text style={styles.percent}>
          {progress}%
        </Text>
      </View>

      {/* ACTION CARD */}
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.actionCard,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        ]}
      >
        <View style={styles.textBlock}>
          <Text style={styles.actionTitle}>
            Продолжить урок
          </Text>
          <Text style={styles.lesson}>{title}</Text>
        </View>

        <View style={styles.arrow}>
          <Text style={styles.arrowText}>→</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 24,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },

  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  bar: {
    flex: 1,
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },

  fill: {
    height: '100%',
    backgroundColor: '#6C5CE7',
    borderRadius: 10,
  },

  percent: {
    marginLeft: 10,
    fontSize: 12,
    color: '#777',
    fontWeight: '600',
  },

  actionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#6C5CE7',
    padding: 18,
    borderRadius: 18,
  },

  textBlock: {
    flex: 1,
  },

  actionTitle: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },

  lesson: {
    marginTop: 4,
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});