import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { colors } from '../theme/colors';
import { createFullLesson } from '../api/api';

export default function AdminScreen() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('en');
  const [locked, setLocked] = useState(true);

  const [steps, setSteps] = useState<any[]>([]);

  const [type, setType] = useState<'flashcard' | 'quiz'>('flashcard');
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState('');

  // ➕ Добавить шаг в массив
  const handleAddStep = () => {
    if (type === 'flashcard') {
      if (!word || !translation) return alert('Заполни слово и перевод');

      setSteps([
        ...steps,
        {
          type: 'flashcard',
          word,
          translation,
        },
      ]);
    }

    if (type === 'quiz') {
      if (!question || !correctAnswer || !options) {
        return alert('Заполни вопрос, ответ и варианты');
      }

      setSteps([
        ...steps,
        {
          type: 'quiz',
          question,
          correct_answer: correctAnswer,
          options: options
            .split(',')
            .map(o => o.trim())
            .filter(Boolean),
        },
      ]);
    }

    // очистка формы
    setWord('');
    setTranslation('');
    setQuestion('');
    setCorrectAnswer('');
    setOptions('');
  };

  // 🚀 Создать весь урок
  const handleCreateLesson = async () => {
    if (!title) return alert('Введите название');
    if (!steps.length) return alert('Добавь хотя бы 1 шаг');

    try {
      await createFullLesson({
        title,
        language_code: language,
        locked,
        steps,
      });

      alert('Урок создан 🚀');

      // очистка
      setTitle('');
      setSteps([]);
    } catch (e) {
      alert('Ошибка создания');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Админка</Text>

      {/* 📘 LESSON */}
      <Text style={styles.section}>Урок</Text>

      <TextInput
        placeholder="Название"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Язык (en, es, de)"
        style={styles.input}
        value={language}
        onChangeText={setLanguage}
      />

      <Pressable style={styles.switch} onPress={() => setLocked(!locked)}>
        <Text>Locked: {locked ? 'YES' : 'NO'}</Text>
      </Pressable>

      {/* 🧠 STEP BUILDER */}
      <Text style={styles.section}>Добавить шаг</Text>

      <Pressable
        style={styles.switch}
        onPress={() =>
          setType(type === 'flashcard' ? 'quiz' : 'flashcard')
        }
      >
        <Text>Тип: {type}</Text>
      </Pressable>

      {type === 'flashcard' && (
        <>
          <TextInput
            placeholder="Слово"
            style={styles.input}
            value={word}
            onChangeText={setWord}
          />
          <TextInput
            placeholder="Перевод"
            style={styles.input}
            value={translation}
            onChangeText={setTranslation}
          />
        </>
      )}

      {type === 'quiz' && (
        <>
          <TextInput
            placeholder="Вопрос"
            style={styles.input}
            value={question}
            onChangeText={setQuestion}
          />
          <TextInput
            placeholder="Варианты (через запятую)"
            style={styles.input}
            value={options}
            onChangeText={setOptions}
          />
          <TextInput
            placeholder="Правильный ответ"
            style={styles.input}
            value={correctAnswer}
            onChangeText={setCorrectAnswer}
          />
        </>
      )}

      <Pressable style={styles.button} onPress={handleAddStep}>
        <Text style={styles.buttonText}>Добавить шаг</Text>
      </Pressable>

      {/* 👀 PREVIEW */}
      <Text style={styles.section}>Шаги</Text>

      {steps.map((s, i) => (
        <View key={i} style={styles.preview}>
          <Text>{i + 1}. {s.type}</Text>

          {s.type === 'flashcard' && (
            <Text>{s.word} - {s.translation}</Text>
          )}

          {s.type === 'quiz' && (
            <>
              <Text>{s.question}</Text>
              <Text>Ответ: {s.correct_answer}</Text>
            </>
          )}
        </View>
      ))}

      {/* 🚀 CREATE */}
      <Pressable style={styles.button} onPress={handleCreateLesson}>
        <Text style={styles.buttonText}>Создать урок</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
  },
  section: {
    marginTop: 12,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  switch: {
    padding: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
  },
  preview: {
    padding: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
  },
});