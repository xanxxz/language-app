export type Step =
  | {
      id: string;
      type: 'flashcard';
      word: string;
      translation: string;
    }
  | {
      id: string;
      type: 'quiz';
      question: string;
      options: string[];
      correctAnswer: string;
    };

export type Lesson = {
  id: string;
  title: string;
  progress: number;
  locked: boolean;
  steps: Step[];
};

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Приветствие',
    progress: 0,
    locked: false,
    steps: [
      {
        id: '1',
        type: 'flashcard',
        word: 'Hello',
        translation: 'Привет',
      },
      {
        id: '2',
        type: 'flashcard',
        word: 'Hi',
        translation: 'Привет',
      },
      {
        id: '3',
        type: 'flashcard',
        word: 'Good morning',
        translation: 'Доброе утро',
      },
      {
        id: '4',
        type: 'quiz',
        question: 'Как сказать "Привет"?',
        options: ['Hello', 'Bye', 'Night'],
        correctAnswer: 'Hello',
      },
      {
        id: '5',
        type: 'quiz',
        question: 'Что значит "Good morning"?',
        options: ['Спокойной ночи', 'Доброе утро', 'Пока'],
        correctAnswer: 'Доброе утро',
      },
      {
        id: '6',
        type: 'flashcard',
        word: 'Good evening',
        translation: 'Добрый вечер',
      },
      {
        id: '7',
        type: 'quiz',
        question: 'Как сказать "Добрый вечер"?',
        options: ['Good night', 'Good evening', 'Hello'],
        correctAnswer: 'Good evening',
      },
    ],
  },

  {
    id: '2',
    title: 'Основы общения',
    progress: 0,
    locked: false,
    steps: [
      {
        id: '1',
        type: 'flashcard',
        word: 'Yes',
        translation: 'Да',
      },
      {
        id: '2',
        type: 'flashcard',
        word: 'No',
        translation: 'Нет',
      },
      {
        id: '3',
        type: 'flashcard',
        word: 'Please',
        translation: 'Пожалуйста',
      },
      {
        id: '4',
        type: 'flashcard',
        word: 'Thank you',
        translation: 'Спасибо',
      },
      {
        id: '5',
        type: 'quiz',
        question: 'Как сказать "Спасибо"?',
        options: ['Please', 'Thank you', 'Sorry'],
        correctAnswer: 'Thank you',
      },
      {
        id: '6',
        type: 'quiz',
        question: 'Что значит "Please"?',
        options: ['Спасибо', 'Пожалуйста', 'Да'],
        correctAnswer: 'Пожалуйста',
      },
      {
        id: '7',
        type: 'quiz',
        question: 'Как сказать "Нет"?',
        options: ['Yes', 'No', 'Hello'],
        correctAnswer: 'No',
      },
    ],
  },

  {
    id: '3',
    title: 'Еда и напитки',
    progress: 0,
    locked: false,
    steps: [
      {
        id: '1',
        type: 'flashcard',
        word: 'Water',
        translation: 'Вода',
      },
      {
        id: '2',
        type: 'flashcard',
        word: 'Food',
        translation: 'Еда',
      },
      {
        id: '3',
        type: 'flashcard',
        word: 'Apple',
        translation: 'Яблоко',
      },
      {
        id: '4',
        type: 'flashcard',
        word: 'Bread',
        translation: 'Хлеб',
      },
      {
        id: '5',
        type: 'quiz',
        question: 'Что значит "Apple"?',
        options: ['Хлеб', 'Яблоко', 'Вода'],
        correctAnswer: 'Яблоко',
      },
      {
        id: '6',
        type: 'quiz',
        question: 'Как сказать "Вода"?',
        options: ['Water', 'Milk', 'Juice'],
        correctAnswer: 'Water',
      },
      {
        id: '7',
        type: 'quiz',
        question: 'Что значит "Bread"?',
        options: ['Молоко', 'Хлеб', 'Сок'],
        correctAnswer: 'Хлеб',
      },
    ],
  },

  {
    id: '4',
    title: 'Базовые фразы',
    progress: 0,
    locked: true,
    steps: [
      {
        id: '1',
        type: 'flashcard',
        word: 'How are you?',
        translation: 'Как дела?',
      },
      {
        id: '2',
        type: 'flashcard',
        word: 'I am fine',
        translation: 'У меня всё хорошо',
      },
      {
        id: '3',
        type: 'flashcard',
        word: 'What is your name?',
        translation: 'Как тебя зовут?',
      },
      {
        id: '4',
        type: 'quiz',
        question: 'Что значит "How are you?"',
        options: ['Как тебя зовут?', 'Как дела?', 'Где ты?'],
        correctAnswer: 'Как дела?',
      },
      {
        id: '5',
        type: 'quiz',
        question: 'Как сказать "Меня зовут..."',
        options: ['I am fine', 'My name is...', 'Hello'],
        correctAnswer: 'My name is...',
      },
    ],
  },
];