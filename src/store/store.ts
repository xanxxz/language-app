import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getLessons,
  getMe,
  getProgress,
  updateLanguage,
  updateUsername,
} from '../api/api';

type User = {
  username: string;
  email: string;
  language_code: string;
  role: string;
};

type Lesson = any;

type Stats = {
  xp: number;
  streak: number;
};

type State = {
  user: User | null;
  fetchUser: () => Promise<void>;

  setLanguage: (lang: string) => Promise<void>;
  updateUser: (username: string) => Promise<void>;
  logout: () => Promise<void>;

  lessons: Lesson[];
  setLessons: (lessons: Lesson[]) => void;

  currentLesson: Lesson | null;
  currentStepIndex: number;

  startLesson: (lesson: Lesson) => void;
  nextStep: () => void;
  exitLesson: () => void;

  stats: Stats;
  setStats: (stats: Stats) => void;

  updateLessonProgress: (lessonId: number, progress: number) => void;
  loadProgress: () => Promise<void>;
};

export const useLessonStore = create<State>((set, get) => ({
  user: null,

  lessons: [],
  currentLesson: null,
  currentStepIndex: 0,

  // 👤 USER
  fetchUser: async () => {
    try {
      const user = await getMe();

      set({ user });
    } catch (e) {
      console.log('fetch user error', e);
    }
  },

  setLanguage: async (language_code) => {
    try {
      const updated = await updateLanguage(language_code);

      set({ user: updated });

      // 🔥 ВАЖНО — перезагружаем уроки
      const lessons = await getLessons();
      set({ lessons });

    } catch (e) {
      console.log('set language error', e);
    }
  },

  updateUser: async (username: string) => {
    const updated = await updateUsername(username);
    set({ user: updated });
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');

    set({
      user: null,
      lessons: [],
      currentLesson: null,
      currentStepIndex: 0,
    });
  },

  // 📚 LESSONS (с сервера)
  setLessons: (lessons) => set({ lessons }),

  // ▶️ START LESSON
  startLesson: (lesson) =>
    set({
      currentLesson: lesson,
      currentStepIndex: 0,
    }),

  // ⏭️ NEXT STEP
  nextStep: () => {
    const { currentLesson, currentStepIndex } = get();

    if (!currentLesson) return;

    const next = currentStepIndex + 1;

    if (next >= currentLesson.steps.length) {
      set({
        currentLesson: null,
        currentStepIndex: 0,
      });
    } else {
      set({ currentStepIndex: next });
    }
  },

  exitLesson: () =>
    set({
      currentLesson: null,
      currentStepIndex: 0,
    }),

  stats: {
    xp: 0,
    streak: 0,
  },

  updateLessonProgress: (lessonId: number, progress: number) => {
    set((state) => ({
      lessons: state.lessons.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, progress }
          : lesson
      ),
    }));
  },

  setStats: (stats) => set({ stats }),

    loadProgress: async () => {
      try {
        const data = await getProgress();

        set({
          lessons: data.lessons, // или как у тебя приходит
          stats: data.stats,
        });
      } catch (e) {
        console.log('load progress error', e);
      }
    },
}));