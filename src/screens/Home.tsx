import { Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import ProgressCard from '../components/Home/ProgressCard';
import LessonItem from '../components/Home/LessonItem';
import { useLessonStore } from '../store/store';
import { useEffect } from 'react';
import { getLessons } from '../api/api';


export default function Home({ navigation }: any) {
  const { lessons, loadProgress, startLesson, stats, setLessons } = useLessonStore();

  useEffect(() => {
    const init = async () => {
      await loadProgress(); // подтянет прогресс + уроки

      const data = await getLessons(); // гарантируем актуальные названия
      setLessons(data);
    };

    init();
  }, []);

  const currentLesson =
    lessons.find((l) => l.progress < 100 && !l.locked) || lessons[0];

  // общий прогресс
  const totalProgress =
    lessons.reduce((acc, l) => acc + l.progress, 0) / lessons.length;

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.header}>Главная</Text>

      <ProgressCard 
        progress={Math.round(totalProgress)} 
        title={currentLesson?.title || ''}
        onPress={() => {
          startLesson(currentLesson);
          navigation.navigate('Уроки');
        }}
      />

      <Text style={styles.title}>Уроки</Text>

      {lessons.slice(0, 2).map((l) => (
        <LessonItem
          key={l.id}
          {...l}
          onPress={() => {
            if (!l.locked) {
              startLesson(l);
              navigation.navigate('Learn');
            }
          }}
        />
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingBlockEnd: 130,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 36,
  },
  title: {
    fontWeight: '600',
    marginVertical: 10,
  },
});