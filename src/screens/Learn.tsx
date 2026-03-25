import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';
import { useLessonStore } from '../store/store';
import { useState, useEffect } from 'react';
import LessonCard from '../components/Learn/LessonCard';

import {
  getLessons,
  getLessonSteps,
  getStepOptions,
  checkAnswer,
  saveProgress,
} from '../api/api';

export default function Learn() {
  const {
    lessons,
    currentLesson,
    currentStepIndex,
    startLesson,
    nextStep,
    exitLesson,
    setLessons,
    updateLessonProgress
  } = useLessonStore();

  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const { user } = useLessonStore();

  // 📚 ЗАГРУЗКА УРОКОВ
  useEffect(() => {
    const load = async () => {
      const data = await getLessons();
      setLessons(data);
    };

    load();
  }, []);

  // 📦 загрузка шагов
  const loadLesson = async (lesson: any) => {
    const steps = await getLessonSteps(lesson.id);

    const fullSteps = await Promise.all(
      steps.map(async (step: any) => {
        if (step.type === 'quiz') {
          const options = await getStepOptions(step.id);

          return {
            ...step,
            options: options?.map((o: any) => o.text) || [],
          };
        }
        return step;
      })
    );

    startLesson({
      ...lesson,
      steps: fullSteps,
    });
  };

  // ❗️ ЗАЩИТА ОТ КРАША
  if (!lessons || lessons.length === 0) {
    return <View style={styles.container} />;
  }

  if (!currentLesson || !currentLesson.steps?.length) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Уроки</Text>

        {lessons.map((lesson) => {
          const isLocked = lesson.locked;

          return (
            <LessonCard
              key={lesson.id}
              id={lesson.id} // 👈 обязательно
              title={lesson.title}
              progress={lesson.progress || 0}
              locked={isLocked}
              isAdmin={user?.role === 'admin'} // 👈 ВАЖНО

              onDelete={(id) => {
                setLessons(lessons.filter(l => l.id !== id));
              }}

              onPress={() => {
                if (isLocked) {
                  console.log('lesson locked');
                  return;
                }

                loadLesson(lesson);
              }}
            />
          );
        })}
      </ScrollView>
    );
  }

  const step = currentLesson.steps[currentStepIndex];

  if (!step) return <View style={styles.container} />;

  const progress =
    currentLesson.steps.length > 0
      ? ((currentStepIndex + 1) / currentLesson.steps.length) * 100
      : 0;

  const handleExit = async () => {
    if (currentLesson) {
      const progressPercent =
        currentLesson.steps?.length > 0
          ? Math.round(
              (currentStepIndex /
                currentLesson.steps.length) *
                100
            )
          : 0;

      await saveProgress(
        currentLesson.id,
        progressPercent,
        false
      );

      updateLessonProgress(
        currentLesson.id,
        progressPercent
      );
    }

    exitLesson();
  };

  // 🧠 ПРОВЕРКА ОТВЕТА
  const handleAnswer = async (option: string) => {
    if (!step || step.type !== 'quiz') return;

    setSelected(option);

    try {
      const result = await checkAnswer(step.id, option);
      const correct = result.correct;

      setIsCorrect(correct);

      const progressPercent =
        ((currentStepIndex + 1) / currentLesson.steps.length) * 100;

      if (correct) {
        await saveProgress(
          currentLesson.id,
          Math.round(progressPercent),
          currentStepIndex + 1 === currentLesson.steps.length
        );

        updateLessonProgress(
          currentLesson.id,
          Math.round(progressPercent)
        );

        setTimeout(() => {
          setSelected(null);
          setIsCorrect(null);
          nextStep();
        }, 700);
      } else {
        setTimeout(() => {
          setSelected(null);
          setIsCorrect(null);
        }, 800);
      }
    } catch (e) {
      console.log('checkAnswer error', e);
    }
  };

  return (
    <View style={styles.container}>

      {/* ПРОГРЕСС */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.fill,
            { width: `${progress}%` },
          ]}
        />
      </View>

      {/* ВЫХОД */}
      <Pressable onPress={handleExit}>
        <Text style={styles.exit}>← Выйти</Text>
      </Pressable>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* FLASHCARD */}
        {step.type === 'flashcard' && (
          <>
            <Pressable
              style={styles.card}
              onPress={() =>
                setShowTranslation(!showTranslation)
              }
            >
              <Text style={styles.word}>
                {showTranslation
                  ? step.translation
                  : step.word}
              </Text>

              <Text style={styles.hint}>
                Нажми чтобы перевернуть
              </Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={() => {
                setShowTranslation(false);
                nextStep();
              }}
            >
              <Text style={styles.buttonText}>
                Далее →
              </Text>
            </Pressable>
          </>
        )}

        {/* QUIZ */}
        {step.type === 'quiz' && (
          <View>
            <Text style={styles.question}>
              {step.question}
            </Text>

            {(step.options || []).map((opt: string) => {
              const isSelected = selected === opt;
              const isRight = opt === step.correctAnswer;

              let backgroundColor = colors.surface;

              if (isSelected && isCorrect === true) {
                backgroundColor = '#4CAF50';
              }

              if (isSelected && isCorrect === false) {
                backgroundColor = '#FF5252';
              }

              if (isCorrect === false && isRight) {
                backgroundColor = '#4CAF50';
              }

              return (
                <Pressable
                  key={opt}
                  style={[
                    styles.option,
                    { backgroundColor },
                  ]}
                  onPress={() => handleAnswer(opt)}
                  disabled={isCorrect === true}
                >
                  <Text style={styles.optionText}>
                    {opt}
                  </Text>
                </Pressable>
              );
            })}

            {isCorrect === false && (
              <Text style={styles.error}>
                ❌ Попробуй ещё раз
              </Text>
            )}
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },

  header: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 36,
  },

  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },

  fill: {
    height: '100%',
    backgroundColor: colors.primary,
  },

  exit: {
    color: colors.textSecondary,
    marginBottom: 12,
  },

  card: {
    backgroundColor: colors.glass,
    padding: 28,
    borderRadius: 24,
    alignItems: 'center',
  },

  word: {
    fontSize: 30,
    fontWeight: '700',
  },

  hint: {
    marginTop: 12,
    fontSize: 12,
    color: colors.textSecondary,
  },

  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  question: {
    fontSize: 18,
    marginBottom: 14,
    fontWeight: '600',
  },

  option: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
  },

  optionText: {
    fontSize: 16,
  },

  error: {
    marginTop: 10,
    color: '#FF5252',
    fontWeight: '500',
  },
});
